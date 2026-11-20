import { resume } from '@/lib/resume';

export const PERSON_DESCRIPTION =
  'AI engineer building agent tooling and applied ML, with three years of backend and full-stack engineering at Opslyft. Peer-reviewed Android malware detection research and open-source tools like QuackCode and Gitwise.';

// Site-wide schema.org @graph rendered as JSON-LD in the root layout.
export function buildSiteGraph(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Prajwal HD',
        description: 'Portfolio, projects, writing, and resume of Prajwal HD.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: resume.name,
        url: siteUrl,
        description: PERSON_DESCRIPTION,
        jobTitle: 'AI Engineer',
        email: `mailto:${resume.email}`,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'professional inquiries',
          email: resume.email,
          url: resume.linkedin,
          availableLanguage: 'en',
        },
        alumniOf: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'Purdue University Fort Wayne',
            url: 'https://www.pfw.edu',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Fort Wayne',
              addressRegion: 'IN',
              addressCountry: 'US',
            },
          },
        ],
        knowsAbout: [
          'Applied AI',
          'AI Agents',
          'Developer Tools',
          'Backend Systems',
          'Full-Stack Development',
          'Android Malware Detection',
          'Platform Engineering',
          'Cloud Cost Engineering',
          'Multi-cloud Infrastructure',
          'Python',
          'TypeScript',
          'Go',
        ],
        sameAs: [resume.github, resume.linkedin, 'https://x.com/_hdprajwal'],
      },
    ],
  };
}
