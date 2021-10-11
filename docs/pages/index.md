# Pages

The application contains the following pages.

## index.tsx

This is the index/home page of the app

## \_app.tsx

This page acts like a "layout" page and wraps all of the other pages within the app.

## [section]/

This is a special directory that Next.js uses for [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes). There are two pages within this directory.

1. `[slug].tsx` - is a dynamic page and is responsible for rendering all of the lesson pages for the courses, i.e., `/testing-your-first-application/todomvc-app-install-and-overview`.
2. `index.tsx` - is reponsible for rendering all of the course landing pages, i.e., `/testing-your-first-application`.

## real-world-examples/

This is a special directory that Next.js uses for [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes). There are two pages within this directory.

1. `[slug].tsx` - is a dynamic page and is responsible for rendering all of the real world example pages, i.e., `/real-world-examples/authentication-overview-and-setup`.
2. `index.tsx` - is reponsible for rendering the real world examples landing page, i.e., `/real-world-examples`.
