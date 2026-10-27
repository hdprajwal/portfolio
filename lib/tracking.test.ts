import { describe, expect, it } from 'vitest';
import { campaignRedirectPath, classifyLink, isEmailCopy } from './tracking';

describe('campaignRedirectPath', () => {
  it('builds a home redirect with application UTM params for a valid code', () => {
    expect(campaignRedirectPath('company-name')).toBe(
      '/?utm_source=application&utm_campaign=company-name'
    );
  });

  it('lowercases the code so campaigns are not split by casing', () => {
    expect(campaignRedirectPath('Company-Name')).toBe(
      '/?utm_source=application&utm_campaign=company-name'
    );
  });

  it('rejects codes with characters outside letters, digits, and hyphens', () => {
    expect(campaignRedirectPath('a/b')).toBeNull();
    expect(campaignRedirectPath('a b')).toBeNull();
    expect(campaignRedirectPath('a?b=c')).toBeNull();
  });

  it('rejects empty and overlong codes', () => {
    expect(campaignRedirectPath('')).toBeNull();
    expect(campaignRedirectPath('x'.repeat(65))).toBeNull();
  });
});

describe('classifyLink', () => {
  const siteHost = 'hdprajwal.dev';
  const resumePdfUrl = 'https://assets.hdprajwal.dev/resume.pdf';

  it('classifies the resume PDF link as a resume download', () => {
    expect(classifyLink(resumePdfUrl, siteHost, resumePdfUrl)).toEqual({
      name: 'resume_download',
      properties: { url: resumePdfUrl },
    });
  });

  it('classifies an external link as an outbound click with its domain', () => {
    expect(
      classifyLink('https://github.com/hdprajwal', siteHost, resumePdfUrl)
    ).toEqual({
      name: 'outbound_click',
      properties: {
        url: 'https://github.com/hdprajwal',
        domain: 'github.com',
        kind: 'external',
      },
    });
  });

  it('classifies mailto links as outbound clicks of kind mailto', () => {
    expect(
      classifyLink('mailto:someone@example.com', siteHost, resumePdfUrl)
    ).toEqual({
      name: 'outbound_click',
      properties: {
        url: 'mailto:someone@example.com',
        domain: '',
        kind: 'mailto',
      },
    });
  });

  it('ignores same-host and relative links', () => {
    expect(
      classifyLink('https://hdprajwal.dev/projects', siteHost, resumePdfUrl)
    ).toBeNull();
    expect(classifyLink('/projects', siteHost, resumePdfUrl)).toBeNull();
    expect(classifyLink('#contact', siteHost, resumePdfUrl)).toBeNull();
  });

  it('ignores unparseable hrefs', () => {
    expect(
      classifyLink('javascript:void(0)', siteHost, resumePdfUrl)
    ).toBeNull();
  });
});

describe('isEmailCopy', () => {
  const email = 'someone@example.com';

  it('matches when the copied text is exactly the email', () => {
    expect(isEmailCopy('someone@example.com', email)).toBe(true);
  });

  it('matches when the email is part of a larger selection, any casing', () => {
    expect(isEmailCopy('reach me at Someone@Example.com today', email)).toBe(
      true
    );
  });

  it('does not match unrelated text or empty selections', () => {
    expect(isEmailCopy('someone@example.org', email)).toBe(false);
    expect(isEmailCopy('', email)).toBe(false);
  });
});
