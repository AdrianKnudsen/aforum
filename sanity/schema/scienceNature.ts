const scienceNaturePostSchema = {
  name: "scienceNaturePost",
  type: "document",
  title: "Science & Nature",
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
          { value: "space", title: "Space & Astronomy" },
          { value: "environment", title: "Environment" },
          { value: "biology", title: "Biology" },
          { value: "physics", title: "Physics" },
          { value: "nature", title: "Nature & Wildlife" },
          { value: "chemistry", title: "Chemistry" },
          { value: "medicine", title: "Medicine & Health" },
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

export default scienceNaturePostSchema;
