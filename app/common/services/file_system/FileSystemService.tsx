import { IFileSystemService } from "./IFileSystemService";
import * as FileSystem from 'expo-file-system';

export class FileSystemService implements IFileSystemService {
    async deletePicture(uri: string): Promise<void> {
        try {
            const fileExists = await FileSystem.getInfoAsync(uri);

            if (fileExists.exists) {
                await FileSystem.deleteAsync(uri);
                console.log(`Imagem deletada: ${uri}`);
            } else {
                console.warn("A imagem não foi encontrada na memória para ser excluída.");
            }
        } catch (error) {
            console.error("Erro ao deletar a imagem:", error);
        }
    }

    async savePicture(uri: string, name: string): Promise<string> {
        try {
            const timestamp = Date.now(); // Gera um timestamp único
            const fileName = `${name.replace(/\s+/g, '')}-${timestamp}.jpg`;
            const destinationUri = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.moveAsync({
                from: uri,
                to: destinationUri,
            });

            return destinationUri;
        } catch (error) {
            console.error("Erro ao salvar a imagem:", error);
            throw error;
        }
    }
}


