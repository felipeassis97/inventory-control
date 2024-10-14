// src/common/components/EmptyState.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface EmptyStateProps {
    message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            {/* Carrega uma imagem de ilustração dos assets */}
            <Image source={require('../../theme/resources/assets/illustrations/empty-state.png')} style={styles.image} />
            {/* Exibe a mensagem */}
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 164,
        height: 164,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});