import { z } from "zod";

export const workSessionSchema = z.object({
  intent: z.string().min(1, "Intent is required"),
  projectId: z.string().min(1, "Project is required"),
  notes: z.string().optional,
});

export type WorkSessionFormData = z.infer<typeof workSessionSchema>;

export const idleWorkSessionSchema = z.object({
  intent: z.string().min(1, "Intent is required"),
  projectId: z
    .number()
    .optional()
    .refine((val) => val !== undefined, {
      message: "Project is required",
    }),
});

export type IdleWorkSessionFormData = z.infer<typeof idleWorkSessionSchema>;
