import { Separator } from "../ui/separator";

export default function DateLabel({
  label,
  duration,
}: {
  label: string;
  duration?: string;
}) {
  return (
    <div className="flex items-center gap-2 my-4">
      <span className="text-xl font-semibold text-brand-yellow whitespace-nowrap">
        {label}
      </span>

      {duration && (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-muted-foreground">•</span>

          <span className="text-lg font-semibold text-muted-foreground">
            {duration}
          </span>
        </div>
      )}
      <Separator className="flex-1" />
    </div>
  );
}
