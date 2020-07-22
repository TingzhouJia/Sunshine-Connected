interface Pagination<T> {
    limit: any,
    order: Partial<Record<keyof Partial<T>, 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1>>,
    offset:number,
    page:number;
}