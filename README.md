# AForum - A Modern Forum Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Introduction

AForum is a modern forum application built with Next.js and Sanity.io. Users can register, log in, and post rich-text content across different categories.

## Features

- **Authentication:** Register and log in with email/password via Supabase Auth. Includes forgot password with email reset link.
- **Responsive layout:** Categories shown in sidebar on desktop; all visible on mobile.
- **Category navigation:** Click a category in the sidebar to switch between General, Technology, Lifestyle, and Science.
- **Rich text posts:** Write posts with bold, italic, underline, strikethrough, bullet/numbered lists, and blockquotes via Tiptap editor.
- **Interactive posts:** Expand and collapse post content on click.
- **Show more/less:** Load additional posts per category on demand.
- **Sanity Studio:** Manage content and authors at `/studio`.

## Technologies Used

- **Next.js 14** – App Router, API routes, server-side rendering
- **Supabase** – Authentication (sign up, sign in, password reset)
- **Sanity.io** – Headless CMS for posts and author profiles
- **Tiptap** – Rich text editor
- **CSS Modules** – Scoped component styling

## Usage

### Register / Log in

1. Click **Logg inn** in the navbar.
2. Switch to the **Registrer** tab to create a new account (username, email, password).
3. After registration, log in with your email and password.
4. Use **Glemt passord** to receive a password reset link by email.

### Adding a New Post

1. Log in.
2. Click the `+` icon in the navbar to open the post form in the desired category.
3. Write a title and use the rich text editor for content.
4. Click **Legg til** to publish the post.

### Navigating Categories

- On desktop, click a category in the left sidebar to switch views.
- On mobile, all categories are shown simultaneously.

### Pagination

- By default, three posts are shown per category.
- Click **Show all** to load all posts, or **Show less** to collapse.
