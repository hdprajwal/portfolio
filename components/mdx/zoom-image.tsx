'use client';

import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Medium-style click-to-zoom for MDX images; typography/layout stays in typeset.css.
export default function ZoomImage(props: any) {
  // ~5.5% margin per side keeps the zoomed image at roughly 85-90% of the viewport
  const zoomMargin =
    typeof window === 'undefined' ? 48 : Math.round(window.innerWidth * 0.055);
  return (
    <Zoom
      zoomMargin={zoomMargin}
      wrapElement="span"
      a11yNameButtonZoom={`Expand image: ${props.alt ?? 'image'}`}
      zoomImg={
        typeof props.src === 'string'
          ? { src: props.src, alt: props.alt ?? '' }
          : undefined
      }
    >
      <Image
        {...props}
        alt={props.alt ?? ''}
        width={props.width || 1920}
        height={props.height || 1080}
        // Serve the original file: lossy resizing blurs screenshot text, and the zoom reuses the same pixels.
        unoptimized
        style={{ width: '100%', height: 'auto' }}
      />
    </Zoom>
  );
}
