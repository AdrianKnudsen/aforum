import { StructureBuilder } from "sanity/structure";

const categories = [
  {
    name: "generalPost",
    title: "General",
    subcategories: [
      { value: "introductions", title: "Introductions" },
      { value: "off-topic", title: "Off-topic" },
      { value: "random", title: "Random" },
      { value: "announcements", title: "Announcements" },
      { value: "help", title: "Help & Support" },
      { value: "feedback", title: "Feedback" },
      { value: "news", title: "News & Updates" },
    ],
  },
  {
    name: "technologyPost",
    title: "Technology",
    subcategories: [
      { value: "programming", title: "Programming" },
      { value: "gaming", title: "Gaming" },
      { value: "ai", title: "AI & Machine Learning" },
      { value: "hardware", title: "Hardware" },
      { value: "webdev", title: "Web Development" },
      { value: "cybersecurity", title: "Cybersecurity" },
      { value: "mobile", title: "Mobile & Apps" },
      { value: "opensource", title: "Open Source" },
    ],
  },
  {
    name: "lifestyleHobbiesPost",
    title: "Lifestyle & Hobbies",
    subcategories: [
      { value: "fitness", title: "Fitness & Health" },
      { value: "food", title: "Food & Cooking" },
      { value: "travel", title: "Travel" },
      { value: "music", title: "Music" },
      { value: "art", title: "Art & Design" },
      { value: "photography", title: "Photography" },
      { value: "books", title: "Books & Reading" },
      { value: "diy", title: "DIY & Crafts" },
    ],
  },
  {
    name: "scienceNaturePost",
    title: "Science & Nature",
    subcategories: [
      { value: "space", title: "Space & Astronomy" },
      { value: "environment", title: "Environment" },
      { value: "biology", title: "Biology" },
      { value: "physics", title: "Physics" },
      { value: "nature", title: "Nature & Wildlife" },
      { value: "chemistry", title: "Chemistry" },
      { value: "medicine", title: "Medicine & Health" },
    ],
  },
  {
    name: "sportsPost",
    title: "Sports",
    subcategories: [
      { value: "football", title: "Football" },
      { value: "basketball", title: "Basketball" },
      { value: "esports", title: "Esports" },
      { value: "combat", title: "Combat Sports" },
      { value: "motorsport", title: "Motorsport" },
      { value: "other-sports", title: "Other Sports" },
    ],
  },
  {
    name: "entertainmentPost",
    title: "Entertainment",
    subcategories: [
      { value: "movies", title: "Movies & Film" },
      { value: "tv-shows", title: "TV Shows & Series" },
      { value: "anime", title: "Anime & Manga" },
      { value: "comics", title: "Comics & Graphic Novels" },
      { value: "podcasts", title: "Podcasts" },
      { value: "celebrities", title: "Celebrities" },
    ],
  },
  {
    name: "businessPost",
    title: "Business & Finance",
    subcategories: [
      { value: "entrepreneurship", title: "Entrepreneurship" },
      { value: "investing", title: "Investing" },
      { value: "crypto", title: "Crypto & Web3" },
      { value: "careers", title: "Careers & Jobs" },
      { value: "marketing", title: "Marketing" },
      { value: "startups", title: "Startups" },
    ],
  },
];

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Authors")
        .child(S.documentTypeList("author").title("Authors")),
      S.divider(),
      ...categories.map((cat) =>
        S.listItem()
          .title(cat.title)
          .child(
            S.list()
              .title(cat.title)
              .items([
                S.listItem()
                  .title("All posts")
                  .child(
                    S.documentList()
                      .title(`All ${cat.title} posts`)
                      .filter("_type == $type")
                      .params({ type: cat.name })
                  ),
                S.divider(),
                ...cat.subcategories.map((sub) =>
                  S.listItem()
                    .title(sub.title)
                    .child(
                      S.documentList()
                        .title(sub.title)
                        .filter(
                          "_type == $type && subcategory == $subcategory"
                        )
                        .params({ type: cat.name, subcategory: sub.value })
                    )
                ),
              ])
          )
      ),
    ]);
