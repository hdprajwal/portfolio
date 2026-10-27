import type { StackIconSlug } from '@/components/icons/stack-icons';

export type StackItem = {
  name: string;
  icon?: StackIconSlug;
};

export type StackCategory = {
  label: string;
  items: StackItem[];
};

export const stack: StackCategory[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Go', icon: 'go' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    label: 'AI & ML',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'Model Context Protocol', icon: 'modelcontextprotocol' },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Bun', icon: 'bun' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'SQLite', icon: 'sqlite' },
    ],
  },
  {
    label: 'Cloud & Infra',
    items: [
      { name: 'AWS', icon: 'aws' },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'Azure', icon: 'azure' },
      { name: 'Cloudflare Workers', icon: 'cloudflareworkers' },
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Firecracker' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'React Native', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Electron', icon: 'electron' },
      { name: 'Astro', icon: 'astro' },
    ],
  },
  {
    label: 'Workflow & AI',
    items: [
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Codex', icon: 'openai' },
      { name: 'Gemini', icon: 'googlegemini' },
      { name: 'v0', icon: 'v0' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Vercel', icon: 'vercel' },
    ],
  },
  {
    label: 'Analytics',
    items: [{ name: 'PostHog', icon: 'posthog' }],
  },
];
