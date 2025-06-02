import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { SearchIcon } from "lucide-react";

export const MeetingsSearchFilter = () => {
  const [filters, setFIlters] = useMeetingsFilters();

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
