export type ResumeRole = {
  title: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Open Source';
  from: string;
  to: string;
  bullets: string[];
};

export type ResumeCompany = {
  name: string;
  location: string;
  roles: ResumeRole[];
};

export type ResumeEducation = {
  school: string;
  degree: string;
  major: string;
  from: string;
  to: string;
  thesis?: { title: string; href: string };
  coursework?: string;
};

export type ResumePublication = {
  title: string;
  venue: string;
  year: string;
  citation: string;
  summary: string;
  href: string;
};

export type ResumeTalk = {
  title: string;
  venue: string;
  summary: string;
  href?: string;
};

export type Resume = {
  name: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  pdfUrl: string;
  summary: string;
  updated: string;
  experience: ResumeCompany[];
  education: ResumeEducation[];
  publications: ResumePublication[];
  talks: ResumeTalk[];
};

export const resume: Resume = {
  name: 'Prajwal HD',
  headline: 'AI Engineer / Backend / Full-Stack',
  location: 'California, USA',
  email: 'hdprajwal01@gmail.com',
  github: 'https://github.com/hdprajwal',
  linkedin: 'https://www.linkedin.com/in/hdprajwal',
  website: 'https://hdprajwal.dev',
  pdfUrl: 'https://assets.hdprajwal.dev/resume.pdf',
  summary:
    'AI engineer with a backend and full-stack foundation. Three years shipping production cloud cost infrastructure at Opslyft (including ~$100K/month in recurring savings for enterprise AWS customers), plus peer-reviewed research on Android malware detection at Purdue.',
  updated: '2026-07-03',
  experience: [
    {
      name: 'Translation Commons',
      location: 'Remote',
      roles: [
        {
          title: 'Software Engineer, Open Source',
          type: 'Open Source',
          from: 'Feb 2026',
          to: 'Present',
          bullets: [
            "Built lang-nav-mcp, a TypeScript MCP (Model Context Protocol) server deployed on a Cloudflare Worker that exposes the language graph as MCP tools; as one use case, a PM can query a region's language distribution to plan market expansion and localization.",
            'Set up per-PR Cloudflare preview deployments (a live URL for every PR), cutting review turnaround and letting non-technical Product and Design teammates review changes directly; paired with AI-generated variants, the team now previews multiple versions of a feature live before choosing one.',
            'Instrumented the platform with Amplitude product analytics, giving maintainers their first visibility into feature and export usage and shifting roadmap decisions from guesswork to data on what users actually use.',
          ],
        },
      ],
    },
    {
      name: 'Opslyft',
      location: 'Bangalore, India',
      roles: [
        {
          title: 'Cloud Engineer',
          type: 'Full-time',
          from: 'Mar 2022',
          to: 'Nov 2023',
          bullets: [
            'Drove ~$100K/month in recurring cost savings across enterprise AWS customers by identifying idle infrastructure, reserved-instance gaps, and data-transfer inefficiencies.',
            'Built a multi-cloud asset management service that unified resource discovery across customer AWS, GCP, and Azure accounts for cost attribution and governance.',
            'Partnered with customer engineering teams to redesign cloud architectures for cost and security, shortening their deployment cycles.',
          ],
        },
        {
          title: 'Software Development Engineer',
          type: 'Full-time',
          from: 'Apr 2021',
          to: 'Mar 2022',
          bullets: [
            'Reduced SaaS platform page load times by 2x through UI component refactoring and render-path optimization.',
            'Redesigned backend logic for the instance scheduler to cover edge cases, reaching 99% service uptime in customer environments.',
            'Architected multi-cloud Data Transfer Visibility, solving a major pain point for teams trying to attribute cross-region and cross-AZ data transfer costs.',
          ],
        },
      ],
    },
    {
      name: 'Purdue University',
      location: 'Fort Wayne, IN',
      roles: [
        {
          title: 'Teaching Assistant, Machine Learning',
          type: 'Part-time',
          from: 'Jan 2025',
          to: 'Dec 2025',
          bullets: [
            'Supported an undergraduate Machine Learning course through grading and feedback for ~40 students per semester.',
            'Automated grading workflows in Python, improving consistency and reducing turnaround time on student evaluations.',
          ],
        },
        {
          title: 'Research Assistant',
          type: 'Full-time',
          from: 'Oct 2024',
          to: 'Dec 2024',
          bullets: [
            'Designed and shipped an MVP mobile application and backend in React Native and TypeScript for a faculty research project.',
          ],
        },
      ],
    },
    {
      name: 'Gradspace',
      location: 'Bangalore, India',
      roles: [
        {
          title: 'Full-stack Developer Intern',
          type: 'Internship',
          from: 'Sep 2020',
          to: 'Feb 2021',
          bullets: [
            'Rearchitected backend services on AWS, improving API response times and reducing deploy time.',
            'Implemented mobile push notifications to improve user engagement on the platform.',
            'Refactored the mobile codebase with the mobile team, cutting app load time by 60%.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: 'Purdue University, Fort Wayne, IN',
      degree: 'Master of Science',
      major: 'Computer Science',
      from: 'Jan 2024',
      to: 'Dec 2025',
      thesis: {
        title:
          'Re-Evaluating Android Malware Detection: Tabular Features, Vision Models, and Ensembles',
        href: 'https://doi.org/10.3390/electronics15030544',
      },
      coursework:
        'Deep Learning, Cryptography and Network Security, NLP, Algorithm Design, Database Systems',
    },
    {
      school: 'Govt. S.K.S.J Technological Institute, Bangalore, India',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science and Engineering',
      from: 'Aug 2017',
      to: 'Jul 2021',
    },
  ],
  publications: [
    {
      title:
        'Re-Evaluating Android Malware Detection: Tabular Features, Vision Models, and Ensembles',
      venue: 'MDPI Electronics',
      year: '2026',
      citation: 'Hosahalli Dayananda, P.; Chen, Z. Electronics 2026, 15, 544.',
      summary:
        'Compares tabular static features, vision-based byte-plot models, and ensemble strategies for Android malware classification across 1M+ samples. Evaluates where modality choice changes the detection surface and where ensembles actually pay for themselves.',
      href: 'https://doi.org/10.3390/electronics15030544',
    },
  ],
  talks: [
    {
      title: 'Data Transfer Cost Optimization',
      venue: 'Rootconf 2022',
      summary:
        'Co-presented an approach to granular visibility into cloud data transfer costs using AWS Cost and Usage Reports and VPC flow logs.',
      href: 'https://hasgeek.com/rootconf/optimizing-costs-of-cloud-infrastructure/sub/data-transfer-cost-optimization-KGSAciSRiEjTo1bjGNWChG',
    },
    {
      title: 'Simplifying the Complexities of Kubernetes Cost Visibility',
      venue: 'Opslyft Webinar, Jun 2022',
      summary:
        'Spoke alongside Aayush Kumar (Founder and CEO, Opslyft) on bridging Kubernetes orchestration and underlying cloud infrastructure costs: capacity misconfigurations, siloed visibility, and building a transparency layer for effective cost management.',
    },
  ],
};
