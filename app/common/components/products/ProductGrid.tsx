// src/common/components/ProductGrid.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../../data/models/response/Product';

interface ProductGridProps {
    products: Product[];
    onFavoriteToggle: (productId: number, isFavorite: boolean) => void; // Função de toggle
    onProductPress: (product: Product) => void; // Nova função para abrir a modal
}

export default function ProductGrid({ products, onFavoriteToggle, onProductPress }: ProductGridProps) {
    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity onPress={() => onProductPress(item)} style={styles.gridItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>

            {/* Botão de Favoritar/Desfavoritar */}
            <TouchableOpacity
                onPress={() => onFavoriteToggle(item.id, !item.favorite)}
                style={styles.favoriteButton}
            >
                <Ionicons
                    name={item.favorite ? "heart" : "heart-outline"}
                    size={24}
                    color={item.favorite ? "#f00" : "#777"}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Label "Products" */}
            <Text style={styles.label}>Products</Text>

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    listContainer: {
        flexGrow: 1,
    },
    flatList: {
        flex: 1,
    },
    gridItem: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        paddingBottom: 10,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333',
    },
    price: {
        fontSize: 14,
        color: '#777',
        marginVertical: 8,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
});