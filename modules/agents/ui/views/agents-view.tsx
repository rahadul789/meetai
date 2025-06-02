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
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters, // eta add korar por amra ekta error pacchilam."""Error: Switched to client rendering because the server rendering errored:"""====> ey error ta howar reson hocche because our initial load must match with our server component. so we went app>(dashboard)>agents>page.tsx then we changed there: used use searchParams adn for that we needed to create "params.ts" file under modules>agents
    })
  ); // ekhane jodi ami "useQuery" use kortam insted of "useSuspenseQuery" thaolew kaz korto kintu ami revalidate korte partam na

  return (
    <div className=" flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
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
