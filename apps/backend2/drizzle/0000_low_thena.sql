CREATE TABLE "fright_quote" (
	"shipment_id" serial PRIMARY KEY NOT NULL,
	"origin_port" text,
	"destination_port" text,
	"container_type" text,
	"carrier" text,
	"right_rate" integer,
	"effective_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
