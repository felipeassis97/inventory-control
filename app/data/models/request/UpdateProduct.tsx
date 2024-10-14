export interface UpdateProduct {
    id: number;
    name: string;
    price: number;
    description?: string | null;
    image?: string | null;
    categoryId: number;
    favorite: boolean;
    quantity: number;
}