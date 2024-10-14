import { Product } from "../../../models/response/Product";
import { CreateProduct } from "../../../models/request/CreateProduct";
import { UpdateProduct } from "../../../models/request/UpdateProduct";

export interface IProductRepository {
    fetchProducts(): Promise<Product[]>;
    deleteProduct(id: number): Promise<void>;
    fetchFavoriteProducts(): Promise<Product[]>;
    addProduct(product: CreateProduct): Promise<void>;
    updateProduct(product: UpdateProduct): Promise<void>;
    fetchProductsByCategory(categoryId: number): Promise<Product[]>;
    updateProductFavorite(productId: number, isFavorite: boolean): Promise<void>;
}