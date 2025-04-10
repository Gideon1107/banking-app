CREATE TABLE "accountDetails" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_number" integer NOT NULL,
	"account_type" varchar(50) NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "accountDetails_account_number_unique" UNIQUE("account_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"dob" date NOT NULL,
	"nationality" text NOT NULL,
	"address" text NOT NULL,
	"isactive" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accountDetails" ADD CONSTRAINT "accountDetails_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;