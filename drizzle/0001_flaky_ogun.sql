CREATE TABLE "check_in" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"birth_date" date NOT NULL,
	"gender" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"complaint" text NOT NULL,
	"appointment_time" text DEFAULT '09:00 AM' NOT NULL,
	"room" text DEFAULT '201' NOT NULL,
	"floor" integer DEFAULT 2 NOT NULL,
	"status" text DEFAULT 'approved' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"specialty" text NOT NULL,
	"bio" text NOT NULL,
	"avatar_url" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"specialty_summary" text NOT NULL,
	"procedures" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"education" jsonb NOT NULL,
	"training" jsonb NOT NULL,
	"affiliations" jsonb NOT NULL,
	"about_paragraphs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"certificates" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"media" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"contact_email" text NOT NULL,
	"contact_phone" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insurances" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer,
	"is_policy_holder_same_as_patient" boolean DEFAULT true NOT NULL,
	"policy_holder_name" text NOT NULL,
	"health_insurance_plan" text NOT NULL,
	"health_insurance_number" text NOT NULL,
	"group_number" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"date_of_birth" text NOT NULL,
	"address_line1" text NOT NULL,
	"address_line2" text DEFAULT '',
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"preferred_contact_method" text NOT NULL,
	"contact_info" text NOT NULL,
	"referral_source" text DEFAULT '',
	"ssn" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "surgeries" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" integer,
	"doctor_name" text NOT NULL,
	"doctor_specialty" text NOT NULL,
	"doctor_avatar_url" text NOT NULL,
	"specialty_summary" text NOT NULL,
	"procedures" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'Active' NOT NULL,
	"recommendation_comment" text,
	"suggestion_note" text NOT NULL,
	"patient_name" text NOT NULL,
	"patient_email" text NOT NULL,
	"patient_dob" text NOT NULL,
	"address_line_1" text NOT NULL,
	"address_line_2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"contact_info" text NOT NULL,
	"referral_source" text,
	"preferred_contact_method" text NOT NULL,
	"ssn" text,
	"is_policy_holder_same_as_patient" boolean DEFAULT true NOT NULL,
	"policy_holder_name" text NOT NULL,
	"health_insurance_plan" text NOT NULL,
	"health_insurance_number" text NOT NULL,
	"group_number" text,
	"preferred_appointment_time" text NOT NULL,
	"urgency" text NOT NULL,
	"reason_for_visit" text NOT NULL,
	"cancel_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visit_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"patient_id" integer NOT NULL,
	"insurance_id" integer,
	"doctor_id" integer NOT NULL,
	"doctor_name" text NOT NULL,
	"doctor_specialty" text NOT NULL,
	"doctor_avatar_url" text NOT NULL,
	"preferred_appointment_time" text NOT NULL,
	"urgency" text NOT NULL,
	"reason_for_visit" text NOT NULL,
	"status" text DEFAULT 'Active' NOT NULL,
	"rating" integer,
	"review_comment" text,
	"recommendation_comment" text,
	"referred_by_name" text,
	"referred_by_specialty" text,
	"referred_by_avatar_url" text,
	"cancel_reason" text,
	"has_family_badge" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "dokterTEST" CASCADE;--> statement-breakpoint
DROP TABLE "appointment" CASCADE;--> statement-breakpoint
ALTER TABLE "insurances" ADD CONSTRAINT "insurances_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "surgeries" ADD CONSTRAINT "surgeries_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_insurance_id_insurances_id_fk" FOREIGN KEY ("insurance_id") REFERENCES "public"."insurances"("id") ON DELETE set null ON UPDATE no action;