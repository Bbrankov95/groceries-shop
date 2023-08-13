export const navRoutes = [
  { name: "Home", path: "/" },
  { name: "Groceries", path: "/groceries" },
] as const;

export const actions = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
} as const;
