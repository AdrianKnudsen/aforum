const lifestyleHobbiesPostSchema = {
  name: "lifestyleHobbiesPost",
  type: "document",
  title: "Lifestyle & Hobbies",
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

export default lifestyleHobbiesPostSchema;
