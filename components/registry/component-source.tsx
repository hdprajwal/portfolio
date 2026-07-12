import fs from 'fs';
import path from 'path';
import { CustomMDX } from '@/components/mdx/custom-mdx';

// Server component: renders a repo file as a highlighted code block, so demo code tabs always show the real source. The fence meta feeds the Pre wrapper's file name header and line numbers.
export function ComponentSource({
  file,
  title,
  lineNumbers = true,
}: {
  file: string;
  // Shown in the code block header bar when set; omit for a bare block with the floating copy icon.
  title?: string;
  lineNumbers?: boolean;
}) {
  const source = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const meta = [
    title ? `title="${title}"` : null,
    lineNumbers ? 'showLineNumbers' : null,
  ]
    .filter(Boolean)
    .join(' ');
  return <CustomMDX source={`\`\`\`\`tsx ${meta}\n${source}\n\`\`\`\``} />;
}
