CREATE TABLE "article_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer NOT NULL,
	"user_id" text,
	"author_name" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"author_name" text NOT NULL,
	"introduction" text NOT NULL,
	"heading" text NOT NULL,
	"paragraphs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"quote" text,
	"closing" text NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"category" text DEFAULT 'gallery' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "surgeries" DROP CONSTRAINT "surgeries_doctor_id_doctors_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "insurances" ALTER COLUMN "patient_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "surgeries" ALTER COLUMN "doctor_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "visit_request_id" integer;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "queue_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "rating" integer;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "review_comment" text;--> statement-breakpoint
ALTER TABLE "check_in" ADD COLUMN "reviewed_at" timestamp;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "visit_request_id" integer;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "patient_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "insurance_id" integer;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "procedure_specialty" text NOT NULL;--> statement-breakpoint
ALTER TABLE "surgeries" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD COLUMN "referred_by_doctor_id" integer;--> statement-breakpoint
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "article_comments_articleId_idx" ON "article_comments" USING btree ("article_id");--> statement-breakpoint
CREATE INDEX "article_comments_userId_idx" ON "article_comments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_visit_request_id_visit_requests_id_fk" FOREIGN KEY ("visit_request_id") REFERENCES "public"."visit_requests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_visit_request_id_visit_requests_id_fk" FOREIGN KEY ("visit_request_id") REFERENCES "public"."visit_requests"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_insurance_id_insurances_id_fk" FOREIGN KEY ("insurance_id") REFERENCES "public"."insurances"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_referred_by_doctor_id_doctors_id_fk" FOREIGN KEY ("referred_by_doctor_id") REFERENCES "public"."doctors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "check_in_userId_idx" ON "check_in" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "check_in_visitRequestId_idx" ON "check_in" USING btree ("visit_request_id");--> statement-breakpoint
CREATE INDEX "doctors_specialty_idx" ON "doctors" USING btree ("specialty");--> statement-breakpoint
CREATE INDEX "insurances_patientId_idx" ON "insurances" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "patients_userId_idx" ON "patients" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "surgeries_userId_idx" ON "surgeries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "surgeries_doctorId_idx" ON "surgeries" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "surgeries_status_idx" ON "surgeries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "visit_requests_userId_idx" ON "visit_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "visit_requests_doctorId_idx" ON "visit_requests" USING btree ("doctor_id");--> statement-breakpoint
CREATE INDEX "visit_requests_status_idx" ON "visit_requests" USING btree ("status");--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "doctor_name";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "doctor_specialty";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "doctor_avatar_url";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "specialty_summary";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "procedures";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "patient_name";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "patient_email";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "patient_dob";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "address_line_1";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "address_line_2";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "zipcode";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "contact_info";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "referral_source";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "preferred_contact_method";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "ssn";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "is_policy_holder_same_as_patient";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "policy_holder_name";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "health_insurance_plan";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "health_insurance_number";--> statement-breakpoint
ALTER TABLE "surgeries" DROP COLUMN "group_number";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "doctor_name";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "doctor_specialty";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "doctor_avatar_url";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "referred_by_name";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "referred_by_specialty";--> statement-breakpoint
ALTER TABLE "visit_requests" DROP COLUMN "referred_by_avatar_url";