export interface FilterData {
    page: number;
    limit: number;
    sort_direction: string;
    sort_column: string;
    f: Filer[];
    prefix_filter_field: string;
}
interface Filer {
    field: string;
    operator: string;
    value: any;
}
export {};
