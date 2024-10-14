
import { IDatabaseService } from "../../../../common/services/db/IDatabaseService";
import { CreateProduct } from "../../../models/request/CreateProduct";
import { UpdateProduct } from "../../../models/request/UpdateProduct";
import { Product } from "../../../models/response/Product";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
    private database: IDatabaseService<Product>;

    constructor(database: IDatabaseService<Product>) {
        this.database = database;
    }

    async fetchProducts(): Promise<Product[]> {
        return await this.database.getAll('SELECT * FROM products');
    }

    async addProduct(product: CreateProduct): Promise<void> {
        await this.database.add(
            'INSERT INTO products (name, price, description, image, categoryId, favorite) VALUES (?, ?, ?, ?, ?, ?)',
            [product.name, product.price, product.description, product.imageUri, product.categoryId, 0]
        );
    }

    async updateProduct(product: UpdateProduct): Promise<void> {
        await this.database.update(
            'UPDATE products SET name = ?, price = ?, description = ?, image = ?, categoryId = ?, favorite = ? WHERE id = ?',
            [product.name, product.price, product.description, product.image, product.categoryId, product.favorite ? 1 : 0, product.id]
        );
    }

    async deleteProduct(id: number): Promise<void> {
        await this.database.delete('DELETE FROM products WHERE id = ?', [id]);
    }

    async fetchFavoriteProducts(): Promise<Product[]> {
        return await this.database.getAll('SELECT * FROM products WHERE favorite = 1');
    }

    async fetchProductsByCategory(categoryId: number): Promise<Product[]> {
        return await this.database.getAll(`SELECT * FROM products WHERE categoryId = ${categoryId}`);
    }

    async updateProductFavorite(productId: number, isFavorite: boolean): Promise<void> {
        await this.database.update('UPDATE products SET favorite = ? WHERE id = ?', [isFavorite ? 1 : 0, productId]);
    }
}