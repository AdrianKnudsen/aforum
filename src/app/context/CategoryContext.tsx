"use client";
import { createContext, useContext, useState } from "react";

export type Category = "general" | "technology" | "lifestyle" | "science";

interface CategoryContextType {
  selected: Category;
  setSelected: (cat: Category) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  selected: "general",
  setSelected: () => {},
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Category>("general");
  return (
    <CategoryContext.Provider value={{ selected, setSelected }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
