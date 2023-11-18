import { getAuthOnServer } from "./getAuthOnServer";

/**
 * This method is used to get the current user, if exists, on the server.
 * Internally calls getAuthOnServer which is used to create the supabase server client to read cookies from "next/headers".
 * Do not use method to modify cookies.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=server-component
 */
export const getUserOnServer = async () => {
  const { auth } = getAuthOnServer();

  const {
    data: { user },
  } = await auth.getUser();

  return user;
};
