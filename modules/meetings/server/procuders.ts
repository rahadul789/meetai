import { z } from "zod";
import { db } from "@/lib/db";
import { meetings } from "@/lib/db/schema";

import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";

export const meetingsRouter = createTRPCRouter({
  // TODO: Change 'getOne' to use 'ProtectedProcedure'
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMetting] = await db
        .select({
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );

      if (!existingMetting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }

      return existingMetting;
    }),

  // TODO: Change 'getMany' to use 'ProtectedProcedure'
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
      // .optional() // eta ekhane optional na korle ami error pabo "agents-view" page er this line a: const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    )

    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db

        .select({
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // throw new TRPCError({ code: "BAD_REQUEST" }); // ekhane error ashle eta unhandled rernder hote thake , eta @tanstack/react-query uhandled rerender likhe research korley solution pawa jabe, suggested solution holo lower version use kora and another package install kora type
    }),
});
