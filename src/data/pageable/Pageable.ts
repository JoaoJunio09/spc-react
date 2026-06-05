
interface Page {
	size: number,
	totalElements: number,
	totalPages: number
	number: number,
}

interface Link {
	first: any,
	last: any,
	next: any,
	self: any
}

export interface Pageable<T, K extends string> {
	page: Page;
	_embedded: Record<K, T[]>;
	_links: Link;
}

export function emptyPageable<T, K extends string>(
  key: K
): Pageable<T, K> {

  const embedded = {} as Record<K, T[]>;
  embedded[key] = [];

  return {
    _embedded: embedded,
    page: {
      number: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0
    },
    _links: {} as Link
  };
}