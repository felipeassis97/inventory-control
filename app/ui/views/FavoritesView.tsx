import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { FavoritesController } from '../controllers/FavoritesController';
import { Product } from '../../data/models/response/Product';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '../../common/components/feedbacks/EmptyState';

const { width } = Dimensions.get('window');

export default function FavoritesView() {
    const { favorites, fetchFavorites, toggleFavorite } = FavoritesController();
    const [refreshing, setRefreshing] = useState(false);

    // Atualiza a lista de favoritos
    const onRefresh = useCallback(async () => {
        setRefreshing(true); // Inicia o estado de carregamento
        await fetchFavorites(); // Chama a função para buscar os favoritos
        setRefreshing(false); // Finaliza o estado de carregamento
    }, [fetchFavorites]); // Adicione fetchFavorites como dependência

    // Renderiza cada item da lista de favoritos
    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description || "Sem descrição disponível"}</Text>
                <Text style={styles.itemPrice}>R${item.price.toFixed(2)}</Text>
            </View>

            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Ionicons
                    name={item.favorite ? "heart" : "heart-outline"}
                    size={24}
                    color={item.favorite ? "#e74c3c" : "#ccc"}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} // Chama a função onRefresh ao puxar
                        />
                    }
                />
            ) : (
                <EmptyState message="Você ainda não tem produtos favoritados." />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 56,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#67C4A7',
        marginBottom: 4,
    },
    emptyText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
});