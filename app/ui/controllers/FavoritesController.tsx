import { useEffect, useState } from "react";
import { ServiceLocator } from "../../common/service_locator/ServiceLocator";
import { IProductRepository } from "../../data/repositories/local/products/IProductRepository";
import { Product } from "../../data/models/response/Product";

export function FavoritesController() {
    let productRepository: IProductRepository = ServiceLocator.productRepository();
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Função para buscar todos os produtos favoritados
    const fetchFavorites = async () => {
        const result = await productRepository.fetchFavoriteProducts();
        setFavorites(result);
    };

    // Função para favoritar/desfavoritar um produto
    const toggleFavorite = async (product: Product) => {
        if (product.favorite) {
            await productRepository.updateProductFavorite(product.id, false);
        } else {
            await productRepository.updateProductFavorite(product.id, true);
        }
        fetchFavorites(); // Atualiza a lista de favoritos após a alteração
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return { favorites, fetchFavorites, toggleFavorite }; // Adiciona fetchFavorites à exportação
}