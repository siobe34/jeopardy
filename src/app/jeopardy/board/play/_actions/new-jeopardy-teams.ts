"use server";

import { type FormState } from "@/components/jeopardy-form/form";
import { SITE_ROUTES } from "@/lib/site-routes";
import { createTeamInput } from "@/lib/zod-schemas/trpc-inputs";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const createJeopardyTeams = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const gidFormData = formData.get("gameId");
  const unsafeGameId = gidFormData ? +gidFormData : undefined;

  const unsafeTeam1Name = formData.get("team1");
  const unsafeTeam2Name = formData.get("team2");

  const zodParser = createTeamInput.safeParse([
    { name: unsafeTeam1Name, gameId: unsafeGameId },
    { name: unsafeTeam2Name, gameId: unsafeGameId },
  ]);

  if (zodParser.success) {
    const gameId = unsafeGameId;
    await api.team.create(zodParser.data);

    redirect(`${SITE_ROUTES.jeopardyPlay.path}/${gameId}`);
  }

  const { errors } = zodParser.error;

  return {
    responseType: "error",
    serverResponses: Array.from(new Set(errors.map((err) => err.message))),
  };
};
