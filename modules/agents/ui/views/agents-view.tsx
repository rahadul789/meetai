//////////////////////////////////////////////// This is for client side fetching and not cache anything

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";

// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";

// export const AgentsView = () => {
//   const trpc = useTRPC();

//   const { data, isLoading, isError } = useQuery(
//     trpc.agents.getMany.queryOptions()
//   );

//   if (isLoading) {
//     return (
//       <LoadingState
//         title="Loading Agents"
//         description="This may take a few seconds"
//       />
//     );
//   }

//   if (isError) {
//     return (
//       <ErrorState
//         title="Failed to load agents"
//         description="Something went wrong"
//       />
//     );
//   }

//   return <div>{JSON.stringify(data, null, 2)}</div>;
// };

"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions()); // ekhane jodi ami "useQuery" use kortam insted of "useSuspenseQuery" thaolew kaz korto kintu ami revalidate korte partam na

  return (
    <div className=" flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join in your meetings. Each agent will follow your instructios and can interact with participants during the call"
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This will take some times"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
};
