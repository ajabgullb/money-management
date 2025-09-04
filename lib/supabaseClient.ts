import { createClient } from "@supabase/supabase-js";

const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!projectUrl || !anonKey) {
  throw new Error("Missing Supabase URL or Anon Key");
}

const supabase = createClient(projectUrl, anonKey);
export default supabase;