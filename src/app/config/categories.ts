// Central definition of all forum categories and their subcategories.

export type CategoryKey =
  | "general"
  | "technology"
  | "lifestyle"
  | "science"
  | "sports"
  | "entertainment"
  | "business";

export interface SubcategoryDef {
  value: string;
  label: string;
}

export interface CategoryDef {
  label: string;
  sanityType:
    | "generalPost"
    | "technologyPost"
    | "lifestyleHobbiesPost"
    | "scienceNaturePost"
    | "sportsPost"
    | "entertainmentPost"
    | "businessPost";
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
      { value: "help", label: "Help & Support" },
      { value: "feedback", label: "Feedback" },
      { value: "news", label: "News & Updates" },
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
      { value: "webdev", label: "Web Development" },
      { value: "cybersecurity", label: "Cybersecurity" },
      { value: "mobile", label: "Mobile & Apps" },
      { value: "opensource", label: "Open Source" },
    ],
  },
  lifestyle: {
    label: "Lifestyle & Hobbies",
    sanityType: "lifestyleHobbiesPost",
    subcategories: [
      { value: "fitness", label: "Fitness & Health" },
      { value: "food", label: "Food & Cooking" },
      { value: "travel", label: "Travel" },
      { value: "music", label: "Music" },
      { value: "art", label: "Art & Design" },
      { value: "photography", label: "Photography" },
      { value: "books", label: "Books & Reading" },
      { value: "diy", label: "DIY & Crafts" },
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
      { value: "chemistry", label: "Chemistry" },
      { value: "medicine", label: "Medicine & Health" },
    ],
  },
  sports: {
    label: "Sports",
    sanityType: "sportsPost",
    subcategories: [
      { value: "football", label: "Football" },
      { value: "basketball", label: "Basketball" },
      { value: "esports", label: "Esports" },
      { value: "combat", label: "Combat Sports" },
      { value: "motorsport", label: "Motorsport" },
      { value: "other-sports", label: "Other Sports" },
    ],
  },
  entertainment: {
    label: "Entertainment",
    sanityType: "entertainmentPost",
    subcategories: [
      { value: "movies", label: "Movies & Film" },
      { value: "tv-shows", label: "TV Shows & Series" },
      { value: "anime", label: "Anime & Manga" },
      { value: "comics", label: "Comics & Graphic Novels" },
      { value: "podcasts", label: "Podcasts" },
      { value: "celebrities", label: "Celebrities" },
    ],
  },
  business: {
    label: "Business & Finance",
    sanityType: "businessPost",
    subcategories: [
      { value: "entrepreneurship", label: "Entrepreneurship" },
      { value: "investing", label: "Investing" },
      { value: "crypto", label: "Crypto & Web3" },
      { value: "careers", label: "Careers & Jobs" },
      { value: "marketing", label: "Marketing" },
      { value: "startups", label: "Startups" },
    ],
  },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES) as CategoryKey[];
