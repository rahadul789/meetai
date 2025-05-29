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

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
