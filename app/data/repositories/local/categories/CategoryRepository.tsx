import { IDatabaseService } from "../../../../common/services/db/IDatabaseService";
import { Category } from "../../../models/response/Category";
import { ICategoryRepository } from "./ICategoryRepository";


export class CategoryRepository implements ICategoryRepository {
    private database: IDatabaseService<Category>;

    constructor(database: IDatabaseService<Category>) {
        this.database = database;
    }

    async fetchCategories(): Promise<Category[]> {
        return await this.database.getAll('SELECT * FROM categories');
    }
}