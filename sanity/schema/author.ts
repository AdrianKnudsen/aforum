const authorSchema = {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "username",
      type: "string",
      title: "Username",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      // Stored as a bcrypt hash — never expose this via public GROQ queries
      name: "passwordHash",
      type: "string",
      title: "Password Hash",
      hidden: true,
    },
    {
      name: "bio",
      type: "text",
      title: "Bio",
    },
    {
      name: "role",
      type: "string",
      title: "Role",
      options: {
        list: [
          { title: "Member", value: "member" },
          { title: "Moderator", value: "moderator" },
          { title: "Admin", value: "admin" },
        ],
        layout: "radio",
      },
      initialValue: "member",
    },
    {
      name: "joinedAt",
      type: "datetime",
      title: "Joined At",
    },
  ],
  preview: {
    select: {
      title: "username",
      subtitle: "role",
    },
  },
};

export default authorSchema;
