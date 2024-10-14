// src/common/components/CategoryFilter.tsx
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import CategoryItem from './CategoryItem';
import { Category } from '../../../data/models/response/Category';

interface CategoryFilterProps {
    categories: Category[];
    onCategoryPress: (categoryId: number) => void;
    selectedCategoryId: number | null; // Novo prop para passar a categoria selecionada
}

export default function CategoryFilter({ categories, onCategoryPress, selectedCategoryId }: CategoryFilterProps) {
    return (
        <View style={styles.container}>
            {/* Label "Categories" */}
            <Text style={styles.label}>Categories</Text>

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CategoryItem
                        iconName={item.icon}
                        title={item.name}
                        onPress={() => onCategoryPress(item.id)}
                        isSelected={selectedCategoryId === item.id} // Verifica se está selecionado
                    />
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: 8,
    },
});