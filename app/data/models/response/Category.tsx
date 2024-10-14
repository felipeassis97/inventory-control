import { Ionicons } from '@expo/vector-icons';

export interface Category {
    id: number;
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
}