import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductController } from '../controllers/ProductController';
import CategoryFilter from '../../common/components/category/CategoryFilter';
import SearchBar from '../../common/components/feedbacks/SearchBar';
import Carousel from '../../common/components/feedbacks/Carousel';
import ProductGrid from '../../common/components/products/ProductGrid';
import EmptyState from '../../common/components/feedbacks/EmptyState';
import ProductModal from './ProductDetailsModal';
import { Product } from '../../data/models/response/Product';
import { UpdateProduct } from '../../data/models/request/UpdateProduct'; // Certifique-se de que a interface de UpdateProduct está importada

export default function HomeView() {
  const {
    banners,
    products,
    categories,
    selectedCategory,
    handleCategoryPress,
    toggleFavorite,
    updateProduct  // Para salvar as atualizações do produto
  } = ProductController();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // O estado pode ser Product ou null
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade da modal

  // Abre a modal com o produto selecionado
  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // Salva o produto após a edição
  const handleSaveProduct = async (updatedProduct: UpdateProduct) => {
    await updateProduct(updatedProduct);  // Certifique-se de que o método aceita UpdateProduct
    setModalVisible(false);
  };

  // Filtra produtos com base na busca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar produtos..."  // Label em português
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {banners.length > 0 ? (
        <Carousel banners={banners} />
      ) : (
        <EmptyState message="Nenhum banner disponível" />  // Label em português
      )}

      <CategoryFilter
        categories={categories}
        onCategoryPress={handleCategoryPress}
        selectedCategoryId={selectedCategory}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
          onFavoriteToggle={toggleFavorite}
          onProductPress={handleProductPress} // Passa a função para abrir a modal
        />
      ) : (
        <EmptyState message="Nenhum produto encontrado" />  // Label em português
      )}

      {/* Modal de produto para edição */}
      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveProduct}  // Passa a função para salvar as edições
        categories={categories}  // Passa as categorias disponíveis para edição
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 20,
  },
});