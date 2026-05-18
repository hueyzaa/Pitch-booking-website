export interface FailItem<T = Record<string, unknown>> {
    data: T;
    message: string;
}
export interface ColumnDefinition {
    header: string;
    key: string;
    width?: number;
}
