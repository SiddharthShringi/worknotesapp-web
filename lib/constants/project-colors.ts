export const PROJECT_COLORS = [
  { name: "blue", value: "blue", bg: "bg-project-blue" },
  { name: "green", value: "green", bg: "bg-project-green" },
  { name: "amber", value: "amber", bg: "bg-project-amber" },
  { name: "red", value: "red", bg: "bg-project-red" },
  { name: "violet", value: "violet", bg: "bg-project-violet" },
  { name: "cyan", value: "cyan", bg: "bg-project-cyan" },
  { name: "pink", value: "pink", bg: "bg-project-pink" },
  { name: "lime", value: "lime", bg: "bg-project-lime" },
  { name: "orange", value: "orange", bg: "bg-project-orange" },
  { name: "indigo", value: "indigo", bg: "bg-project-indigo" },
  { name: "teal", value: "teal", bg: "bg-project-teal" },
  { name: "rose", value: "rose", bg: "bg-project-rose" },
];

export const PROJECT_COLOR_MAP = Object.fromEntries(
  PROJECT_COLORS.map((c) => [c.value, c.bg]),
);
