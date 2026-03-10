import { PROJECT_COLORS } from "@/lib/constants/project-colors";

import { Check } from "lucide-react";

type Props = {
  value: string;
  onChange: (color: string) => void;
};

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {PROJECT_COLORS.map((color) => {
        const selected = value === color.value;

        return (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className={`
              relative h-6 w-6 rounded-full
              ${color.bg}
              border border-border
              flex items-center justify-center
              transition
              ${selected ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""}
            `}
          >
            {selected && (
              <Check className="h-4 w-4 text-foreground drop-shadow-sm" />
            )}
          </button>
        );
      })}
    </div>
  );
}
