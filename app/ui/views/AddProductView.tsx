import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../common/theme/buttons/PrimaryButton';
import { AddProductController } from '../controllers/AddProductController';

export default function AddProductView() {
    const {
        categories,
        saveProduct,
        price, setPrice,
        imageUri, setImageUri,
        productName, setProductName,
        description, setDescription,
        quantity, setQuantity,
        showActions, setShowActions,
        selectedCategory, setSelectedCategory
    } = AddProductController();

    // Abre o seletor de imagem da galeria
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua galeria');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setShowActions(false);
        }
    };

    // Remove a imagem selecionada
    const removeImage = () => {
        setImageUri(null);
        setShowActions(false);
    };

    // Controla a ação do FAB para adicionar ou editar imagem
    const handleFabPress = () => {
        if (imageUri) {
            setShowActions(!showActions);
        } else {
            pickImage();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bannerContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.bannerImage} />
                ) : (
                    <Ionicons name="camera" size={80} color="#ccc" style={styles.defaultIcon} />
                )}

                <TouchableOpacity style={styles.fabButton} onPress={handleFabPress}>
                    <Ionicons name={imageUri ? 'pencil' : 'camera'} size={28} color="white" />
                </TouchableOpacity>

                {showActions && imageUri && (
                    <View style={styles.actionMenu}>
                        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Buscar Imagem</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={removeImage}>
                            <Ionicons name="trash-outline" size={24} color="#fff" />
                            <Text style={styles.actionText}>Deletar Imagem</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do produto"
                value={productName}
                onChangeText={setProductName}
            />

            <Text style={styles.label}>Preço</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o preço"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite a quantidade"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Digite a descrição do produto"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

            <Text style={styles.label}>Categoria</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCategory(value)}
                    items={categories.map(category => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    placeholder={{ label: 'Selecione uma categoria...', value: null }}
                    style={{
                        inputIOS: styles.picker,
                        inputAndroid: styles.picker,
                        placeholder: styles.pickerPlaceholder,
                    }}
                    value={selectedCategory}
                />
            </View>

            <PrimaryButton title="Adicionar Produto" onPress={saveProduct} />

            <View style={{ paddingBottom: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 56,
    },
    bannerContainer: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    defaultIcon: {
        opacity: 0.5,
    },
    fabButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#67C4A7',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMenu: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 10,
        zIndex: 1,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    actionText: {
        color: '#fff',
        marginLeft: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        height: 80,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        padding: 10,
        color: '#333',
    },
    pickerPlaceholder: {
        color: '#999',
    },
});