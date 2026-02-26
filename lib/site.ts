export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://hdprajwal.dev'
    : 'http://localhost:3000');
