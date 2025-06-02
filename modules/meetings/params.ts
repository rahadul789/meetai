import { DEFAULT_PAGE } from "@/constants";
import {
  parseAsInteger,
  parseAsString,
  createLoader,
  parseAsStringEnum,
} from "nuqs/server";

import { MeetingStatus } from "./types";

export const filterSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }), // withDefault and withOptions etar meaning hocche j amr jodi searchbar emppty theke tahole eta search likha ta url theke remove kore dibe
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filterSearchParams);
