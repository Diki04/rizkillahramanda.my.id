import React from 'react';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rizkillah Ramanda Sinyo',
    alternateName: 'Diki',
    url: 'https://rizkillahramanda.my.id',
    image: 'https://avatars.githubusercontent.com/u/104443606?v=4',
    jobTitle: 'Fullstack Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Universitas Riau',
    },
    sameAs: [
      'https://github.com/Diki04',
      'https://www.linkedin.com/in/rizkillah-ramanda-sinyo/',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Python',
      'Tailwind CSS',
      'PostgreSQL',
      'Supabase',
      'Machine Learning',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
