# Jeopardy

A relatively simple and straightforward jeopardy game.

## Features

- Obviously create a jeopardy game
- Login to save your games
- Standard points management (5 categories with 100-500 points each)
- Custom points management (bonus category with customizable points)

## Development Notes

- [x] Connect to database
- [x] Dummy TRPC router to confirm db working as expected
- [x] DB schema
- [x] Implement auth
- [x] Protected routes
- [x] TRPC router for boards
- [x] test board router with auth
- [x] init shadcn
- [ ] basic themeing
- [x] add error boundaries
- [ ] auth login/logout flows
- [x] 5 jeopardy categories (MVP)
- [x] Each category has 5 questions - 100 to 500 points (MVP)
- [x] 2 Teams take turns
- [x] Stealing questions
- [ ] Configurable points for each question
- [ ] Configurable number of total categories
- [ ] Configurable number of teams
