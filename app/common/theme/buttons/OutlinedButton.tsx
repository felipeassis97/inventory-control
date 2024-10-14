import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

interface OutlineButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function OutlineButton({ title, style, ...props }: OutlineButtonProps) {
    return (
        <TouchableOpacity style={[buttonTheme.outlineButton, style]} {...props}>
            <Text style={buttonTheme.outlineButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const buttonTheme = StyleSheet.create({
    outlineButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderColor: '#67C4A7', // Cor da borda
        borderWidth: 2, // Define a espessura da borda
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    outlineButtonText: {
        color: '#67C4A7', // Texto com a cor de destaque
        fontSize: 18,
        fontWeight: 'bold',
    },
});