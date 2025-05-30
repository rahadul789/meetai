import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentListHeader } from "@/modules/agents/ui/components/agents-list-header";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const AgentPage = async () => {
  // ey particular session code add korar por amr hydration error ta solve hoye gese
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default AgentPage;

// upor er code ta kaz korchilo but problem hocche jkhn ami colums a kono change korchilam tkhn hydration error dekhacchilo but reload dile thik hoye jacchilo
// tar por ey uporer component ta ami dui vage divide korle ey problem ta 100% solve hoye jacche

// new ekta issue that eta realod r dekhacche na ager moto

// import { AgentListHeader } from "@/modules/agents/ui/components/agents-list-header";
// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate } from "@tanstack/react-query";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import HydrationBoundaryClient from "@/modules/agents/ui/components/HydrationBoundaryClient";

// const AgentPage = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     redirect("/auth/sign-in");
//   }

// const queryClient = getQueryClient();
// await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

// const dehydratedState = dehydrate(queryClient);

//   return (
//     <>
//       <AgentListHeader />
//       <HydrationBoundaryClient state={dehydratedState} />
//     </>
//   );
// };

// export default AgentPage;
