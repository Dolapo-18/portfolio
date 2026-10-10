import { isPlaceholder } from "../lib/utils.ts";

export function PlaceholderText({ value }: { value: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;

  return (
    <span className="inline-flex rounded-md border border-dashed border-line px-2 py-0.5 text-sm text-muted">
      {value}
    </span>
  );
}
