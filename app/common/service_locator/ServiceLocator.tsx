import { Banner } from "../../data/models/response/Banner";
import { Category } from "../../data/models/response/Category";
import { Product } from "../../data/models/response/Product";
import { BannerRepository } from "../../data/repositories/local/banners/BannerRepository";
import { IBannerRepository } from "../../data/repositories/local/banners/IBannerRepository";
import { CategoryRepository } from "../../data/repositories/local/categories/CategoryRepository";
import { ICategoryRepository } from "../../data/repositories/local/categories/ICategoryRepository";
import { IProductRepository } from "../../data/repositories/local/products/IProductRepository";
import { ProductRepository } from "../../data/repositories/local/products/ProductRepository";

import { IDatabaseService } from "../services/db/IDatabaseService";
import { SQLiteService } from "../services/db/SQLiteService";
import { FileSystemService } from "../services/file_system/FileSystemService";
import { IFileSystemService } from "../services/file_system/IFileSystemService";

export class ServiceLocator {

    //Services
    static databaseService<T>(): IDatabaseService<T> {
        return new SQLiteService<T>();
    }

    static fileSystemService(): IFileSystemService {
        return new FileSystemService();
    }

    //Repositories
    static productRepository(): IProductRepository {
        return new ProductRepository(this.databaseService<Product>());
    }

    static categoryRepository(): ICategoryRepository {
        return new CategoryRepository(this.databaseService<Category>());
    }

    static bannerRepository(): IBannerRepository {
        return new BannerRepository(this.databaseService<Banner>());
    }
}