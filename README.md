# AForum - A Modern Forum Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [License](#license)

## Introduction

AForum is a modern forum application built with Next.js and Sanity.io. It allows users to post topics and content, view different categories like General and Technology, and interact with the content in a seamless and user-friendly interface.

## Features

- **Responsive Navbar:** A sticky navbar that remains at the top of the page during scrolling, providing easy navigation.
- **Dynamic Content:** Fetch and display posts from Sanity.io in different categories.
- **Interactive Posts:** Expand and collapse post content on click.
- **Pagination:** Load more posts by clicking pagination dots.
- **Add New Posts:** Form to add new posts within categories.

## Technologies Used

- **Next.js:** A React framework for server-side rendering and generating static websites.
- **Sanity.io:** A headless CMS to manage and store content.
- **React:** A JavaScript library for building user interfaces.
- **CSS Modules:** Scoped and modular CSS for styling.

## Usage

### General Forum

The General Forum displays all posts categorized under "General". Click on a post title to expand or collapse its content.

### Technology Forum

The Technology Forum displays all posts categorized under "Technology". Click on a post title to expand or collapse its content.

### Lifestyle & Hobbies Forum

The Lifestyle & Hobbies Forum displays all posts categorized under "Lifestyle & Hobbies". Click on a post title to expand or collapse its content.

### Science & Nature Forum

The Science & Nature Forum displays all posts categorized under "Science & Nature". Click on a post title to expand or collapse its content.

### Adding a New Post

1. Navigate to the desired category (e.g., General, Technology).
2. Click on the `+` (add) icon in the navbar.
3. Fill out the form with a title and content for your new post.
4. Click the "Add Post" button to submit your post.

### Pagination

- By default, only two posts are displayed in each category.
- Click on the pagination dots at the bottom of the category section to load more posts.
- The pagination dots will remain visible, allowing you to collapse the extra posts if needed.
