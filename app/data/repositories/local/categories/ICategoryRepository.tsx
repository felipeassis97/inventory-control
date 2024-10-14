import { Category } from "../../../models/response/Category";

export interface ICategoryRepository {
    fetchCategories(): Promise<Category[]>;
}