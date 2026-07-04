import { getProject } from '@/lib/projects';
import { renderOgImage, OG_SIZE } from '@/lib/og/render';

export const alt = 'Project by Prajwal HD';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) {
    return renderOgImage({ kicker: 'Projects', title: 'Prajwal HD' });
  }
  return renderOgImage({
    kicker: 'Project',
    title: project.name,
    subtitle: project.tagline || project.description,
    tags: project.tags,
  });
}
