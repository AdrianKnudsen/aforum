"use client";
import { createContext, useContext, useState } from "react";
import { CategoryKey, CATEGORIES } from "@/app/config/categories";

export type Category = CategoryKey;

interface CategoryContextType {
  selectedCategory: CategoryKey;
  selectedSubcategory: string;
  setSelection: (category: CategoryKey, subcategory: string) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  selectedCategory: "general",
  selectedSubcategory: "introductions",
  setSelection: () => {},
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("general");
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    CATEGORIES.general.subcategories[0].value,
  );

  const setSelection = (category: CategoryKey, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, selectedSubcategory, setSelection }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
