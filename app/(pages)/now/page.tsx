export default function NowPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">/now</h1>
      <p className="mt-2 text-sm text-neutral-500">
        What I'm focused on right now.
      </p>

      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-semibold">
          Thesis - Static Malware Detection Across Modalities
        </h3>
        <p className="text-sm text-muted-foreground text-justify">
          Exploring which signals work best for malware detection: text-based
          static features (e.g., EMBER 2024) vs visual representations
          (MalNet-style images). Running controlled head-to-head benchmarks and
          tracking ROC/AUC with an emphasis on lowering false-positive rates.
          Prototyping ensembles that fuse both modalities to see if they beat
          either alone. Comparing classic ML (XGBoost/LightGBM) with transformer
          vision models (ViT) to balance accuracy, robustness, and compute cost.
        </p>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Last updated: Aug 2025
      </p>
    </main>
  );
}
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
};
