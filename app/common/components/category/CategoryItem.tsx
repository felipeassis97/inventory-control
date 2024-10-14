// src/common/components/CategoryItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CategoryItemProps {
    iconName: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    isSelected: boolean; // Novo prop para saber se o item está selecionado
}

export default function CategoryItem({ iconName, title, onPress, isSelected }: CategoryItemProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, isSelected && styles.selectedContainer]}>
            <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                <Ionicons name={iconName} size={35} color={isSelected ? '#fff' : '#333'} />
            </View>
            <Text style={[styles.title, isSelected && styles.selectedTitle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedContainer: {
        // Estilos adicionais para o item selecionado
    },
    selectedIconContainer: {
        backgroundColor: '#67C4A7', // Fundo preto quando selecionado
    },
    title: {
        marginTop: 4,
        fontSize: 12,
        color: '#333',
    },
    selectedTitle: {
        color: '#333', // Pode manter ou alterar conforme necessário
    },
});