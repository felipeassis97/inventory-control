import { useEffect, useState } from "react";
import { ServiceLocator } from "../../common/service_locator/ServiceLocator";
import { IBannerRepository } from "../../data/repositories/local/banners/IBannerRepository";
import { ICategoryRepository } from "../../data/repositories/local/categories/ICategoryRepository";
import { IProductRepository } from "../../data/repositories/local/products/IProductRepository";
import { Product } from "../../data/models/response/Product";
import { Banner } from "../../data/models/response/Banner";
import { Category } from "../../data/models/response/Category";
import { UpdateProduct } from "../../data/models/request/UpdateProduct";
import { IFileSystemService } from "../../common/services/file_system/IFileSystemService";

export function ProductController() {
    let bannerRepository: IBannerRepository = ServiceLocator.bannerRepository();
    let productRepository: IProductRepository = ServiceLocator.productRepository();
    let categoryRepository: ICategoryRepository = ServiceLocator.categoryRepository();
    let fileSystemService: IFileSystemService = ServiceLocator.fileSystemService();

    const [banners, setBanners] = useState<Banner[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Categoria selecionada

    // Função para buscar todos os produtos
    const fetchProducts = async () => {
        const result = await productRepository.fetchProducts();
        setProducts(result);
    };

    // Função para buscar todas as categorias
    const fetchCategories = async () => {
        const result = await categoryRepository.fetchCategories();
        setCategories(result);
    };

    // Função para atualizar um produto
    const updateProduct = async (updatedProduct: UpdateProduct) => {
        const existingProduct = products.find(p => p.id === updatedProduct.id);
        if (!existingProduct) {
            console.error("Produto não encontrado.");
            return;
        }

        try {
            // // Excluir a imagem anterior se o produto tiver uma imagem antiga e se ela foi alterada
            if (existingProduct.image && existingProduct.image !== updatedProduct.image) {
                await fileSystemService.deletePicture(existingProduct.image);
            }

            // Atualiza o produto no repositório
            await productRepository.updateProduct(updatedProduct);

            // Recarrega os produtos após a atualização
            await fetchProducts();
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            throw error;
        }
    };

    // Função para buscar todos os banners
    const fetchBanners = async () => {
        const result = await bannerRepository.fetchBanners();

        if (result.length > 0) {
            // Verificar se as URLs dos banners são válidas antes de definir o estado
            const validBanners = result.filter(banner => banner.url); // Verificar o campo que tem a URL da imagem
            if (validBanners.length > 0) {
                setBanners(validBanners);
            } else {
                console.warn('Nenhum banner válido encontrado.');
                setBanners([]);
            }
        } else {
            setBanners([]);
        }
    };

    useEffect(() => {
        fetchBanners();
        fetchProducts();
        fetchCategories();
    }, []);

    const handleCategoryPress = async (categoryId: number) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null); // Deseleciona a categoria
            const allProducts = await productRepository.fetchProducts(); // Carrega todos os produtos
            setProducts(allProducts);
        } else {
            setSelectedCategory(categoryId); // Seleciona a nova categoria
            const result = await productRepository.fetchProductsByCategory(categoryId);
            setProducts(result.length > 0 ? result : []);
        }
    };

    const toggleFavorite = async (productId: number, isFavorite: boolean) => {
        await productRepository.updateProductFavorite(productId, isFavorite);
        fetchProducts(); // Atualiza a lista de produtos após o toggle
    };

    return {
        banners,
        products,
        categories,
        selectedCategory,
        updateProduct,
        toggleFavorite, // Retorna a categoria selecionada
        handleCategoryPress,
    };
}