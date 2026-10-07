import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rizkillah Ramanda Sinyo Portfolio',
    short_name: 'Rizkillah Portfolio',
    description: 'Personal portfolio, engineering telemetry, and project showcase of Rizkillah Ramanda Sinyo',
    start_url: '/',
    display: 'standalone',
    background_color: '#070A12',
    theme_color: '#070A12',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
