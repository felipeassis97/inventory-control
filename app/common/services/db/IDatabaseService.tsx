export interface IDatabaseService<T> {
    getAll(query: string, params?: any[]): Promise<T[]>;
    add(query: string, params: any[]): Promise<void>;
    update(query: string, params: any[]): Promise<void>;
    delete(query: string, params: any[]): Promise<void>;
}