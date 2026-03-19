const businessPostSchema = {
  name: "businessPost",
  type: "document",
  title: "Business & Finance",
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
          { value: "entrepreneurship", title: "Entrepreneurship" },
          { value: "investing", title: "Investing" },
          { value: "crypto", title: "Crypto & Web3" },
          { value: "careers", title: "Careers & Jobs" },
          { value: "marketing", title: "Marketing" },
          { value: "startups", title: "Startups" },
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

export default businessPostSchema;
