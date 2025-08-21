const AboutMe = {
  workExperience: [
    {
      organization: 'Purdue University',
      location: 'Fort Wayne',
      logo: '/purdue.png',
      roles: [
        {
          jobTitle: 'Teaching Assistant',
          jobType: 'Part-time',
          dates: {
            from: 'Jan 2025',
            to: 'Present',
          },
          job_descriptions: [
            'Assisted in grading and providing feedback for an undergraduate Machine Learning course at Purdue University Fort Wayne.',
            'Automated grading processes using Python, enhancing efficiency and consistency in student evaluations.',
            'Collaborated with faculty to ensure timely feedback, improving overall student performance and engagement.•',
          ],
        },
        {
          jobTitle: 'Research Assistant',
          jobType: 'Full-time',
          dates: {
            from: 'Oct 2024',
            to: 'Dec 2024',
          },
          job_descriptions: [
            'Designed and developed a minimum viable product (MVP) mobile application and backend from the ground up using React Native and TypeScript.',
            'Improved user engagement by aligning features with project requirements.',
          ],
        },
      ],
    },

    {
      organization: 'Opslyft',
      location: 'Bangalore, India',
      logo: '/opslyft.jpeg',
      roles: [
        {
          jobTitle: 'Cloud Engineer',
          jobType: 'Full-time',
          dates: {
            from: 'Mar 2022',
            to: 'Nov 2023',
          },
          job_descriptions: [
            'Collaborated with customers to identify and implement cost saving opportunities. Resulting in an average recurring saving of over $100,000 every month.',
            'Architected secure and scalable cloud architecture based on customer interactions and requirements.',
            'Partnered with customers to design secure, scalable cloud architectures, improving deployment efficiency.',
            'Developed multi-Cloud Asset management solution, streamlining customers resource discovery workflow for cost management and general use.',
          ],
        },
        {
          jobTitle: 'Software Development Engineer',
          jobType: 'Full-time',
          dates: {
            from: 'Apr 2021',
            to: 'Mar 2022',
          },
          job_descriptions: [
            'Developed and optimized existing Ul components for the SaaS Platform, resulting in 2x reduction in page load times.',
            'Redesigned the backend logic for the Instance scheduler to cover all the edge cases, resulting in 99% service uptime in customer environments.',
            'Architected Data Transfer Visibility for multi cloud, solving a major pain point for companies trying to get visibility on Data Transfer.',
          ],
        },
      ],
    },
    {
      organization: 'Gradspace',
      location: 'Bangalore, India',
      logo: '/gradspace.jpeg',
      roles: [
        {
          jobTitle: 'Full-stack Developer Intern',
          jobType: 'Internship',
          dates: {
            from: 'Sep 2020',
            to: 'Feb 2021',
          },
          job_descriptions: [
            'Architected the backend resulting in improved API response time and decreased time to deploy on Amazon Web services(AWS).',
            'Implement mobile push notification to improve user engagement on the platform.',
            'Coordinate with mobile developers to refactor the codebase, reducing the app load time by 60%.',
          ],
        },
      ],
    },
  ],
  education: [
    {
      organization: 'Purdue University, Fort Wayne, IN',
      organizationId: '',
      degree: 'Master of Science',
      major: 'Computer Science',
      dates: {
        from: 'Jan 2024',
        to: 'Present',
      },
    },
    {
      organization: 'Govt. S.K.S.J Technological Institute, Bangalore, India',
      organizationId: '',
      degree: 'Bachelor of Engineering',
      major: 'Computer Science & Engineering',
      dates: {
        from: 'Aug 2017',
        to: 'Jul 2021',
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Education, experience, and background.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {AboutMe.education.map((edu, index) => (
              <div key={index} className="">
                <h3 className="font-medium">
                  {edu.degree} in {edu.major}
                </h3>
                <p className="text-sm text-[var(--muted-fg)]">
                  {edu.organization}
                </p>
                <p className="text-xs text-[var(--muted-fg)]">
                  {edu.dates.from} - {edu.dates.to}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Experience</h2>
          <div className="space-y-8">
            {AboutMe.workExperience.map((company: any, companyIndex) => (
              <div key={companyIndex} className="">
                <div className="mb-4 ">
                  <h3 className="text-lg font-semibold">
                    {company.organization}
                  </h3>
                  <p className="text-sm text-[var(--muted-fg)]">
                    {company.location}
                  </p>
                </div>

                <div className="space-y-4 ml-2">
                  {company.roles.map((role: any, roleIndex: number) => (
                    <div
                      key={roleIndex}
                      className="border-l border-[var(--border)] border-opacity-50 pl-4"
                    >
                      <h4 className="font-medium">{role.jobTitle}</h4>
                      <p className="text-sm text-[var(--muted-fg)]">
                        {role.jobType} • {role.dates.from} - {role.dates.to}
                      </p>
                      <ul className="mt-2 text-sm text-[var(--muted-fg)] list-disc list-inside space-y-1">
                        {role.job_descriptions.map(
                          (description: string, idx: number) => (
                            <li key={idx}>{description}</li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
