const entertainmentPostSchema = {
  name: "entertainmentPost",
  type: "document",
  title: "Entertainment",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "content",
      type: "text",
      title: "Content",
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
    },
    {
      name: "subcategory",
      type: "string",
      title: "Subcategory",
      options: {
        list: [
          { value: "movies", title: "Movies & Film" },
          { value: "tv-shows", title: "TV Shows & Series" },
          { value: "anime", title: "Anime & Manga" },
          { value: "comics", title: "Comics & Graphic Novels" },
          { value: "podcasts", title: "Podcasts" },
          { value: "celebrities", title: "Celebrities" },
        ],
      },
    },
    {
      name: "createdAt",
      type: "datetime",
      title: "Created At",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
  ],
};

export default entertainmentPostSchema;
