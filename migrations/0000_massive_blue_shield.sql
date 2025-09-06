CREATE TABLE "email_subscriptions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"verification_token" varchar,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_subscriptions_email_unique" UNIQUE("email"),
	CONSTRAINT "email_subscriptions_verification_token_unique" UNIQUE("verification_token")
);
