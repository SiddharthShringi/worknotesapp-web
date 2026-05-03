export const PROJECT_COLORS = [
  {
    name: "blue",
    value: "blue",
    bg: "bg-project-blue",
    text: "text-project-blue",
  },
  {
    name: "green",
    value: "green",
    bg: "bg-project-green",
    text: "text-project-green",
  },
  {
    name: "amber",
    value: "amber",
    bg: "bg-project-amber",
    text: "text-project-amber",
  },
  { name: "red", value: "red", bg: "bg-project-red", text: "text-project-red" },
  {
    name: "violet",
    value: "violet",
    bg: "bg-project-violet",
    text: "text-project-violet",
  },
  {
    name: "cyan",
    value: "cyan",
    bg: "bg-project-cyan",
    text: "text-project-cyan",
  },
  {
    name: "pink",
    value: "pink",
    bg: "bg-project-pink",
    text: "text-project-pink",
  },
  {
    name: "lime",
    value: "lime",
    bg: "bg-project-lime",
    text: "text-project-lime",
  },
  {
    name: "orange",
    value: "orange",
    bg: "bg-project-orange",
    text: "text-project-orange",
  },
  {
    name: "indigo",
    value: "indigo",
    bg: "bg-project-indigo",
    text: "text-project-indigo",
  },
  {
    name: "teal",
    value: "teal",
    bg: "bg-project-teal",
    text: "text-project-teal",
  },
  {
    name: "rose",
    value: "rose",
    bg: "bg-project-rose",
    text: "text-project-rose",
  },
] as const;

export const PROJECT_COLOR_MAP = Object.fromEntries(
  PROJECT_COLORS.map((c) => [c.value, c]),
);
