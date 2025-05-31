import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

export const AgentsSearchFilter = () => {
  const [filters, setFIlters] = useAgentsFilters();

  return (
    <div className=" relative">
      <Input
        placeholder="Filter by name"
        className=" h-9 w-[200px] pl-7 bg-background"
        value={filters.search}
        onChange={(e) => setFIlters({ search: e.target.value })}
      />
      <SearchIcon className=" size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
