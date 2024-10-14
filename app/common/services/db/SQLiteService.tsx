import { IDatabaseService } from './IDatabaseService';
import { useSQLiteContext } from 'expo-sqlite';

export class SQLiteService<T> implements IDatabaseService<T> {
    private db: any;

    constructor() {
        this.db = useSQLiteContext();
    }

    async getAll(query: string): Promise<T[]> {
        try {
            const result = await this.db.getAllAsync(query);
            return result as T[]; // Faz o casting para o tipo T[]
        } catch (error) {
            console.error('Erro ao buscar dados do banco: ', error);
            return [];
        }
    }

    async add(query: string, params: any[]): Promise<void> {
        try {
            await this.db.runAsync(query, params);
        } catch (error) {
            console.error('Erro ao adicionar dados: ', error);
        }
    }

    async update(query: string, params: any[]): Promise<void> {
        try {
            await this.db.runAsync(query, params);
        } catch (error) {
            console.error('Erro ao atualizar dados: ', error);
        }
    }

    async delete(query: string, params: any[]): Promise<void> {
        try {
            await this.db.runAsync(query, params);
        } catch (error) {
            console.error('Erro ao deletar dados: ', error);
        }
    }
}