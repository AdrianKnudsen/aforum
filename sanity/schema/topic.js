import { defineType } from "sanity";

const topicSchema = defineType({
  name: "topic",
  type: "document",
  title: "Topic",
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
  ],
});

export default topicSchema;
