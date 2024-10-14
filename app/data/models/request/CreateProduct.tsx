
export interface CreateProduct {
    name: string;
    price: number;
    description: string;
    imageUri: string | null;
    categoryId: number | null;
    quantity: number;
}