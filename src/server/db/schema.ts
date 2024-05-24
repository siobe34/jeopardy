import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `jeopardy_${name}`);

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 128 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const userRelations = relations(users, ({ many }) => ({
  boards: many(boards),
}));

export const boards = createTable("board", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  userId: varchar("user_id", { length: 128 }).notNull(),
});

export const boardRelations = relations(boards, ({ one, many }) => ({
  owner: one(users, {
    fields: [boards.userId],
    references: [users.clerkId],
  }),
  boardChallenges: many(boardChallenges),
  games: many(games),
}));

export const boardChallenges = createTable("boardChallenge", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 128 }).notNull(),
  status: varchar("status", { length: 10 })
    .$type<"unsolved" | "solved">()
    .default("unsolved")
    .notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  points: integer("points").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  boardId: integer("board_id").notNull(),
});

export const boardChallengeRelations = relations(
  boardChallenges,
  ({ one }) => ({
    owner: one(boards, {
      fields: [boardChallenges.boardId],
      references: [boards.id],
    }),
  }),
);

export const games = createTable("game", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  boardId: integer("board_id").notNull(),
});

export const gameRelations = relations(games, ({ one, many }) => ({
  owner: one(boards, {
    fields: [games.boardId],
    references: [boards.id],
  }),
  teams: many(teams),
}));

export const teams = createTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }),
  points: integer("points").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  gameId: integer("game_id").notNull(),
});

export const teamRelations = relations(teams, ({ one }) => ({
  owner: one(games, {
    fields: [teams.gameId],
    references: [games.id],
  }),
}));
