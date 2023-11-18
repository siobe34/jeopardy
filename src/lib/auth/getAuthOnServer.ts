import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { env } from "@/env.mjs";

/**
 * This method is used to create the supabase server client to ONLY read cookies from "next/headers".
 * Do not use method to modify cookies.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=server-component
 */
export const getAuthOnServer = () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  return supabase;
};
