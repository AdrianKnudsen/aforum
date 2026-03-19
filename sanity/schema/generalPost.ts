const generalPostSchema = {
  name: "generalPost",
  type: "document",
  title: "General",
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
          { value: "introductions", title: "Introductions" },
          { value: "off-topic", title: "Off-topic" },
          { value: "random", title: "Random" },
          { value: "announcements", title: "Announcements" },
          { value: "help", title: "Help & Support" },
          { value: "feedback", title: "Feedback" },
          { value: "news", title: "News & Updates" },
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

export default generalPostSchema;
