import { timestamp } from "drizzle-orm/mysql-core";
import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const workspaces = pgTable('workspaces', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).defaultNow(),
  workspaceOwner: uuid('workspace_owner')
    .notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  logo: text('logo'),
  bannerUrl: text('banner_url'),
});

export const folders = pgTable('folders', {
  folderId: uuid('folder_id').defaultRandom().primaryKey().notNull(),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  bannerUrl: text('banner_url'),
});

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  folderId: uuid('folder_id')
    .notNull()
    .references(() => folders.folderId, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  title: text('title').notNull(),
  iconId: text('icon_id').notNull(),
  data: text('data'),
  inTrash: text('in_trash'),
  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  bannerUrl: text('banner_url'),
});