export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
    favorite: boolean;
    categoryId: number;
    quantity: number;
}