supabase db diff --use-migra -f name_migration

npx supabase db diff --use-migra user_id -f user_id

npx supabase link --project-ref <project-id>

npx supabase db remote commit

npx supabase db push

// not needed really....
supabase db reset

// combine migration files
supabase migration squash [flags]

---

npx supabase gen types typescript --project-id "toufcedtucsakynmarjc" --schema public > types_db.ts

sudo pnpm update
