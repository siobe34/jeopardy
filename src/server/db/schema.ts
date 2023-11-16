// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `jeopardy_${name}`);

export const boards = mysqlTable(
  "boards",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    name: text("name").notNull(),
    status: mysqlEnum("status", ["active", "archived"]).default("active"),
    createdAt: timestamp("createdAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    userIdx: uniqueIndex("user_idx").on(table.userId),
  }),
);

export const boardsRelations = relations(boards, ({ many }) => ({
  challenges: many(challenges),
}));

export const challenges = mysqlTable(
  "challenges",
  {
    id: serial("id").primaryKey(),
    boardId: int("boardId"),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    category: text("category").notNull(),
    points: int("points").notNull(),
    createdAt: timestamp("createdAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    boardIdx: uniqueIndex("board_idx").on(table.boardId),
  }),
);

export const challengesRelations = relations(challenges, ({ one }) => ({
  board: one(boards, {
    fields: [challenges.boardId],
    references: [boards.id],
  }),
}));
