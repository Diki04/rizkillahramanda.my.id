import { NextResponse } from 'next/server';
import { mockProjects } from '@/services/data/mock-projects';

export async function GET() {
  const siteUrl = 'https://rizkillahramanda.my.id';
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
  <channel>
    <title>Rizkillah Ramanda Sinyo - Projects Feed</title>
    <link>${siteUrl}</link>
    <description>Latest engineering projects and updates from Rizkillah Ramanda Sinyo</description>
    <language>en-US</language>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${mockProjects
      .map(
        (proj) => `
    <item>
      <title><![CDATA[${proj.title}]]></title>
      <link>${proj.demoUrl || proj.githubUrl || siteUrl}</link>
      <guid>${siteUrl}/projects/${proj.slug || proj.id}</guid>
      <description><![CDATA[${typeof proj.description === 'string' ? proj.description : proj.description?.en || ''}]]></description>
      <category>${proj.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
