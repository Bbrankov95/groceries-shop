export const navRoutes = [
  { name: "Home", path: "/" },
  { name: "Groceries", path: "/groceries" },
  {
    name: "Groceries Management",
    path: "/groceries-management",
  },
] as const;

export const actions = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
} as const;
