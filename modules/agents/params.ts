import { DEFAULT_PAGE } from "@/constants";
import { parseAsInteger, parseAsString, createLoader } from "nuqs/server";

export const filterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  // withDefault and withOptions etar meaning hocche j amr jodi searchbar emppty theke tahole eta search likha ta url theke remove kore dibe
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filterSearchParams);
