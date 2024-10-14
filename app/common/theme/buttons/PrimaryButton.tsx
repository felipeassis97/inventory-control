import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function PrimaryButton({ title, style, ...props }: PrimaryButtonProps) {
    return (
        <TouchableOpacity style={[buttonTheme.primaryButton, style]} {...props}>
            <Text style={buttonTheme.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const buttonTheme = StyleSheet.create({
    primaryButton: {
        backgroundColor: '#67C4A7',
        paddingVertical: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});