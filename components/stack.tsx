import StackIcon from '@/components/icons/stack-icons';
import { stack } from '@/lib/stack';

export default function Stack() {
  return (
    <div className="space-y-3">
      {stack.map((category) => (
        <div
          key={category.label}
          className="flex flex-col gap-x-4 gap-y-1.5 sm:flex-row sm:items-baseline"
        >
          <span className="text-muted-foreground text-meta shrink-0 sm:w-28">
            {category.label}
          </span>
          <ul className="text-foreground text-meta flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {category.items.map((item) => (
              <li key={item.name} className="inline-flex items-center gap-1.5">
                {item.icon && (
                  <StackIcon slug={item.icon} className="h-3.5 w-3.5" />
                )}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
