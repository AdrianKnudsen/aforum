// Central definition of all forum categories and their subcategories.

export type CategoryKey = "general" | "technology" | "lifestyle" | "science";

export interface SubcategoryDef {
  value: string;
  label: string;
}

export interface CategoryDef {
  label: string;
  sanityType: "generalPost" | "technologyPost" | "lifestyleHobbiesPost" | "scienceNaturePost";
  subcategories: SubcategoryDef[];
}

export const CATEGORIES: Record<CategoryKey, CategoryDef> = {
  general: {
    label: "General",
    sanityType: "generalPost",
    subcategories: [
      { value: "introductions", label: "Introductions" },
      { value: "off-topic", label: "Off-topic" },
      { value: "random", label: "Random" },
      { value: "announcements", label: "Announcements" },
      { value: "help", label: "Help" },
    ],
  },
  technology: {
    label: "Technology",
    sanityType: "technologyPost",
    subcategories: [
      { value: "programming", label: "Programming" },
      { value: "gaming", label: "Gaming" },
      { value: "ai", label: "AI & Machine Learning" },
      { value: "hardware", label: "Hardware" },
      { value: "webdev", label: "Web Dev" },
    ],
  },
  lifestyle: {
    label: "Lifestyle & Hobbies",
    sanityType: "lifestyleHobbiesPost",
    subcategories: [
      { value: "fitness", label: "Fitness" },
      { value: "food", label: "Food & Cooking" },
      { value: "travel", label: "Travel" },
      { value: "music", label: "Music" },
      { value: "art", label: "Art & Design" },
    ],
  },
  science: {
    label: "Science & Nature",
    sanityType: "scienceNaturePost",
    subcategories: [
      { value: "space", label: "Space & Astronomy" },
      { value: "environment", label: "Environment" },
      { value: "biology", label: "Biology" },
      { value: "physics", label: "Physics" },
      { value: "nature", label: "Nature & Wildlife" },
    ],
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
