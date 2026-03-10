import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters long")
    .max(50, "Project name must be at most 50 characters long"),
  description: z.string().optional(),
  color: z.enum([
    "blue",
    "green",
    "amber",
    "red",
    "violet",
    "cyan",
    "pink",
    "lime",
    "orange",
    "indigo",
    "teal",
    "rose",
  ]),
});
