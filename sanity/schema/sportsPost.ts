const sportsPostSchema = {
  name: "sportsPost",
  type: "document",
  title: "Sports",
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
          { value: "football", title: "Football" },
          { value: "basketball", title: "Basketball" },
          { value: "esports", title: "Esports" },
          { value: "combat", title: "Combat Sports" },
          { value: "motorsport", title: "Motorsport" },
          { value: "other-sports", title: "Other Sports" },
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

export default sportsPostSchema;
