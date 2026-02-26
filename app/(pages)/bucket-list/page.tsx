import type { Metadata } from 'next';

type BucketItem = { label: string; done: boolean };

const bucketListItems: BucketItem[] = [
  { label: 'Run a full marathon', done: false },
  { label: 'Finish a full Ironman', done: false },
  { label: 'Trek to Everest Base Camp', done: false },
  { label: 'Visit Masai Mara', done: false },
  { label: 'Scuba dive', done: false },
  { label: 'Surf in Hawaii', done: false },
  { label: 'Learn to ski', done: false },
  { label: 'Skydive', done: false },
  { label: 'Swim with dolphins', done: false },
  { label: 'Be in a submarine', done: false },
  { label: 'Fly an airplane', done: false },
  { label: 'Live in another country', done: true },
  { label: 'Visit Japan', done: false },
  { label: 'Visit the Vatican', done: false },
  { label: 'Watch a rocket launch in person', done: false },
  { label: 'Attend DEF CON', done: false },
  { label: 'Start a company', done: false },
  { label: 'Author a patent', done: false },
  { label: 'Speak at a tech conference', done: false },
  { label: 'Contribute to a major open-source project', done: false },
  { label: 'Read 1000 books', done: false },
  { label: 'Learn a new language', done: false },
  { label: 'Go on a solo trip somewhere completely unfamiliar', done: false },
];

export default function BucketListPage() {
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Bucket List
        </h1>
        <p className="text-muted-foreground pt-2 text-sm">
          Things I want to do, learn, and experience.
        </p>
      </div>

      <section className="px-4 pb-14">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {bucketListItems.map((item, i) => (
              <tr key={item.label} className={i % 2 === 0 ? 'bg-muted/40' : ''}>
                <td className="text-muted-foreground/50 w-8 py-2.5 pl-2 font-mono text-[11px] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </td>
                <td
                  className={`py-2.5 pr-4 ${item.done ? 'text-muted-foreground line-through' : ''}`}
                >
                  {item.label}
                </td>
                <td className="w-8 py-2.5 pr-2 text-right font-mono text-xs">
                  {item.done ? (
                    <span className="text-foreground">✓</span>
                  ) : (
                    <span className="text-muted-foreground/20">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Bucket List',
  description: 'Things Prajwal wants to do, learn, and experience.',
};
