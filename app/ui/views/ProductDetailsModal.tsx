import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../common/theme/buttons/PrimaryButton';
import OutlineButton from '../../common/theme/buttons/OutlinedButton';
import { Product } from '../../data/models/response/Product';
import { Category } from '../../data/models/response/Category';
import { UpdateProduct } from '../../data/models/request/UpdateProduct';

const { width } = Dimensions.get('window');

interface ProductModalProps {
    visible: boolean;
    product: Product | null;
    categories: Category[];
    onClose: () => void;
    onSave: (product: UpdateProduct) => void;
}

export default function ProductModal({ visible, product, categories, onClose, onSave }: ProductModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [quantity, setQuantity] = useState('');
    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setPrice(product.price.toString() || '');
            setDescription(product.description || '');
            setCategoryId(product.categoryId || categories[0]?.id || null);
            setImageUri(product.image || null);
            setQuantity(product.quantity?.toString() || '');
        }
    }, [product, categories]);

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

    const removeImage = () => {
        setImageUri(null);
        setShowActions(false);
    };

    const handleFabPress = () => {
        if (imageUri) {
            setShowActions(!showActions);
        } else {
            pickImage();
        }
    };

    const handleSave = () => {
        if (product) {
            onSave({
                id: product.id,
                name,
                price: parseFloat(price.replace('R$', '').replace('.', '').replace(',', '.')), // Formatando para número
                description: description || null,
                image: imageUri ?? null,
                categoryId: categoryId || categories[0]?.id,
                favorite: product.favorite,
                quantity: parseInt(quantity, 10) || 0,
            });
        }
    };

    if (!product) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
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

                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Nome do Produto</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Preço</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={setPrice}
                            placeholder="R$ 0,00"
                            keyboardType="numeric" // Permite apenas entrada numérica
                        />

                        <Text style={styles.label}>Quantidade</Text>
                        <TextInput
                            style={styles.input}
                            value={quantity}
                            onChangeText={setQuantity}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            style={styles.textArea}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                        />

                        <Text style={styles.label}>Categoria</Text>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setCategoryId(value)}
                                items={categories.map(category => ({
                                    label: category.name,
                                    value: category.id,
                                }))}
                                placeholder={{ label: 'Selecione uma categoria...', value: null }}
                                style={{
                                    inputIOS: {
                                        ...styles.input,
                                        paddingVertical: 10,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#fff',
                                    },
                                    inputAndroid: {
                                        ...styles.input,
                                        paddingVertical: 10,
                                        paddingHorizontal: 10,
                                        backgroundColor: '#fff',
                                    },
                                    placeholder: {
                                        color: '#aaa',
                                    },
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                value={categoryId}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Salvar" onPress={handleSave} style={styles.button} />
                        <OutlineButton title="Fechar" onPress={onClose} style={styles.button} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        paddingBottom: 32,
    },
    bannerContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
        right: 10,
        bottom: 10,
        backgroundColor: '#67C4A7',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    actionMenu: {
        position: 'absolute',
        bottom: 70,
        right: 10,
        backgroundColor: '#67C4A7',
        borderRadius: 5,
        padding: 10,
        elevation: 5,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    actionText: {
        color: '#fff',
        marginLeft: 5,
    },
    detailsContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textArea: {
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        width: '100%',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 32,
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
});