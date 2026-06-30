CREATE TABLE "report" (
	"id" text PRIMARY KEY NOT NULL,
	"reporterId" text NOT NULL,
	"targetType" text NOT NULL,
	"targetId" text NOT NULL,
	"reason" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"resolvedById" text,
	"resolvedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "report_reporter_target_unique" UNIQUE("reporterId","targetType","targetId")
);
--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_reporterId_user_id_fk" FOREIGN KEY ("reporterId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_resolvedById_user_id_fk" FOREIGN KEY ("resolvedById") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;