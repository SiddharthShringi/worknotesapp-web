import { AxiosError } from "axios";
import { Path, UseFormSetError, FieldValues } from "react-hook-form";
import { snakeToCamel } from "../utils/utils";

export type ErrorResponse = {
  error?: string;
  errors?: Record<string, string | string[]>;
};

/**
 * Maps Rails validation errors to React Hook Form.
 * Keeps frontend in camelCase while backend stays snake_case.
 */
export function mapErrors<T extends FieldValues>(
  error: AxiosError<ErrorResponse>,
  setError?: UseFormSetError<T>,
): string | undefined {
  const data = error.response?.data;

  if (!data) {
    return "Something went wrong.";
  }

  // Field validation errors (422)
  if (data.errors && setError) {
    Object.entries(data.errors).forEach(([field, message]) => {
      const formatted = Array.isArray(message) ? message.join(", ") : message;

      const camelField = snakeToCamel(field) as Path<T>;

      setError(camelField, {
        type: "server",
        message: formatted,
      });
    });

    return;
  }

  // Generic error (401, 403, etc.)
  if (data.error) {
    return data.error;
  }

  return "Something went wrong.";
}
