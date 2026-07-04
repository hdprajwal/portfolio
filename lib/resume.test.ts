import { describe, expect, it } from 'vitest';
import { resume } from '@/lib/resume';
import { resumeToMarkdown } from '@/lib/markdown';

describe('resume data', () => {
  it('has a name, summary, and ISO updated date', () => {
    expect(resume.name).toBe('Prajwal HD');
    expect(resume.summary.length).toBeGreaterThan(40);
    expect(resume.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('every role has at least one bullet and a date range', () => {
    for (const company of resume.experience) {
      expect(company.roles.length).toBeGreaterThan(0);
      for (const role of company.roles) {
        expect(role.bullets.length).toBeGreaterThan(0);
        expect(role.from).toBeTruthy();
        expect(role.to).toBeTruthy();
      }
    }
  });

  it('contains no em or en dashes anywhere', () => {
    expect(JSON.stringify(resume)).not.toMatch(/[–—]/);
  });
});

describe('resumeToMarkdown', () => {
  it('renders all companies and section headers', () => {
    const md = resumeToMarkdown(resume);
    expect(md).toContain('# Prajwal HD');
    expect(md).toContain('## Experience');
    expect(md).toContain('## Education');
    expect(md).toContain('## Publications');
    for (const company of resume.experience) {
      expect(md).toContain(company.name);
    }
  });
});
