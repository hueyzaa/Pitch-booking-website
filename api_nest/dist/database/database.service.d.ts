import { DataSource, SelectQueryBuilder } from 'typeorm';
import { FilterData } from './interfaces/filter-data.interface';
export interface PaginationResult<T> {
    collection: T[];
    total: number;
    total_current: number;
    from: number;
    to: number;
    current_page: number;
    next_page: number;
    last_page: number;
}
export declare class DatabaseService {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    findWithPagination<T>(filters: FilterData, query: SelectQueryBuilder<T>, columns?: string[], columnsOverwrite?: string[], groupBy?: string): Promise<PaginationResult<any>>;
    findWithPaginationAndRelations<T>(filters: FilterData, query: SelectQueryBuilder<T>, columns?: string[], columnsOverwrite?: string[]): Promise<PaginationResult<T>>;
    private mergeColumns;
    private parseLimit;
    private parsePage;
    private paginateResponse;
    private applySort;
    private applyFilters;
}
