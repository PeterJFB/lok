CREATE TABLE `cookie_tokens` (
	`cookieToken` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`expiry_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `join_codes` (
	`join_code` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`group_id` text NOT NULL,
	`expiry_ms` integer NOT NULL,
	`active` integer,
	`created_at_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_to_groups` (
	`user_id` integer NOT NULL,
	`group_id` integer NOT NULL,
	CONSTRAINT `users_to_groups_pk` PRIMARY KEY(`user_id`, `group_id`),
	CONSTRAINT `fk_users_to_groups_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	CONSTRAINT `fk_users_to_groups_group_id_groups_id_fk` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`)
);
