import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  id: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

export function FormField({
  label,
  id,
  type,
  registration,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input className="py-5" id={id} type={type} {...registration} />
      <div className="text-destructive text-sm">{error}</div>
    </div>
  );
}
