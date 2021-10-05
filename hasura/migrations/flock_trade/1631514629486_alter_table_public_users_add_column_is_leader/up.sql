alter table "public"."users" add column "is_leader" boolean
 not null default 'false';
