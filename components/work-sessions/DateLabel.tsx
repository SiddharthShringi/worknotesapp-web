import { Separator } from "../ui/separator";

export default function DateLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <span className="text-xl font-semibold text-brand-blue whitespace-nowrap">
        {label}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}
