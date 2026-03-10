import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

type FormFieldProps = {
  label: string;
  id: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  textarea?: boolean;
};

export function FormField({
  label,
  id,
  type,
  registration,
  error,
  textarea = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      {textarea ? (
        <Textarea id={id} {...registration} />
      ) : (
        <Input id={id} type={type} className="py-5" {...registration} />
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
