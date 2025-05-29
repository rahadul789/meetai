import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";

import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new TRPCError({ code: "BAD_REQUEST" }); // ekhane error ashle eta unhandled rernder hote thake , eta @tanstack/react-query uhandled rerender likhe research korley solution pawa jabe, suggested solution holo lower version use kora and another package install kora type

    return data;
  }),
});
