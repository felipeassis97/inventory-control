import { useEffect, useState } from "react";
import { ServiceLocator } from "../../common/service_locator/ServiceLocator";

import { Category } from "../../data/models/response/Category";
import { CreateProduct } from "../../data/models/request/CreateProduct";
import { IFileSystemService } from "../../common/services/file_system/IFileSystemService";
import { ICategoryRepository } from "../../data/repositories/local/categories/ICategoryRepository";
import { IProductRepository } from "../../data/repositories/local/products/IProductRepository";

export function AddProductController() {
    let productRepository: IProductRepository = ServiceLocator.productRepository();
    let categoryRepository: ICategoryRepository = ServiceLocator.categoryRepository();
    let fileSystemService: IFileSystemService = ServiceLocator.fileSystemService();

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setSelectedCategory] = useState<number | null>(null);
    const [name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(''); // Campo para quantidade
    const [showActions, setShowActions] = useState(false);

    // Função para buscar as categorias e popular o combo box
    const fetchCategories = async () => {
        const result = await categoryRepository.fetchCategories();
        setCategories(result);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Função para validar o produto e salvar no banco de dados
    const saveProduct = async () => {
        // Validação de dados obrigatórios
        if (!name.trim() || !price || !categoryId || !quantity) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        try {

            let savedImageUri = imageUri;

            // Se houver uma imagem, salva no armazenamento e recupera a referência
            if (imageUri) {
                savedImageUri = await fileSystemService.savePicture(imageUri, name.trim());
            }

            const product: CreateProduct = {
                name: name.trim(),
                price: parseFloat(price.trim()), // Converte para número
                description: description.trim(),
                imageUri: savedImageUri,
                categoryId: categoryId,
                quantity: parseInt(quantity) // Converte para número inteiro
            };
            await productRepository.addProduct(product);

            // Resetando o formulário após a adição
            setProductName('');
            setPrice('');
            setDescription('');
            setQuantity(''); // Reseta a quantidade
            setImageUri(null);
            setSelectedCategory(null);

            alert('Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
            alert('Ocorreu um erro ao adicionar o produto.');
        }
    };

    return {
        categories,
        saveProduct,
        price, setPrice,
        imageUri, setImageUri,
        productName: name, setProductName,
        description, setDescription,
        quantity, setQuantity, // Funções e estados para quantidade
        showActions, setShowActions,
        selectedCategory: categoryId, setSelectedCategory
    };
}