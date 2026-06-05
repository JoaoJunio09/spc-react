import type { Pageable } from "../pageable/Pageable";
import type { CatechumenResponse } from "./CatechumenResponse";

export type CatechumenPage = Pageable<CatechumenResponse, 'catechumens'>;