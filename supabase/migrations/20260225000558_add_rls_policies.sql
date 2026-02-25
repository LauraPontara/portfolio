
  create table "public"."guests" (
    "id" uuid not null,
    "name" text,
    "profile_image" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."guests" enable row level security;


  create table "public"."messages" (
    "id" bigint generated always as identity not null,
    "guest_id" uuid not null,
    "content" character varying(500) not null,
    "pinned" boolean not null default false,
    "liked" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."messages" enable row level security;

CREATE UNIQUE INDEX guests_pkey ON public.guests USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

alter table "public"."guests" add constraint "guests_pkey" PRIMARY KEY using index "guests_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."guests" add constraint "guests_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."guests" validate constraint "guests_id_fkey";

alter table "public"."messages" add constraint "messages_guest_id_fkey" FOREIGN KEY (guest_id) REFERENCES public.guests(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_guest_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_guest()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.guests (id, name, profile_image)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$function$
;

grant delete on table "public"."guests" to "anon";

grant insert on table "public"."guests" to "anon";

grant references on table "public"."guests" to "anon";

grant select on table "public"."guests" to "anon";

grant trigger on table "public"."guests" to "anon";

grant truncate on table "public"."guests" to "anon";

grant update on table "public"."guests" to "anon";

grant delete on table "public"."guests" to "authenticated";

grant insert on table "public"."guests" to "authenticated";

grant references on table "public"."guests" to "authenticated";

grant select on table "public"."guests" to "authenticated";

grant trigger on table "public"."guests" to "authenticated";

grant truncate on table "public"."guests" to "authenticated";

grant update on table "public"."guests" to "authenticated";

grant delete on table "public"."guests" to "postgres";

grant insert on table "public"."guests" to "postgres";

grant references on table "public"."guests" to "postgres";

grant select on table "public"."guests" to "postgres";

grant trigger on table "public"."guests" to "postgres";

grant truncate on table "public"."guests" to "postgres";

grant update on table "public"."guests" to "postgres";

grant delete on table "public"."guests" to "service_role";

grant insert on table "public"."guests" to "service_role";

grant references on table "public"."guests" to "service_role";

grant select on table "public"."guests" to "service_role";

grant trigger on table "public"."guests" to "service_role";

grant truncate on table "public"."guests" to "service_role";

grant update on table "public"."guests" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "postgres";

grant insert on table "public"."messages" to "postgres";

grant references on table "public"."messages" to "postgres";

grant select on table "public"."messages" to "postgres";

grant trigger on table "public"."messages" to "postgres";

grant truncate on table "public"."messages" to "postgres";

grant update on table "public"."messages" to "postgres";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";


  create policy "Allow public read access on guests"
  on "public"."guests"
  as permissive
  for select
  to public
using (true);



  create policy "Allow authenticated insert on messages"
  on "public"."messages"
  as permissive
  for insert
  to public
with check ((auth.uid() = guest_id));



  create policy "Allow individual delete on messages"
  on "public"."messages"
  as permissive
  for delete
  to public
using ((auth.uid() = guest_id));



  create policy "Allow individual update on messages"
  on "public"."messages"
  as permissive
  for update
  to public
using ((auth.uid() = guest_id))
with check ((auth.uid() = guest_id));



  create policy "Allow public read access on messages"
  on "public"."messages"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_guest();


