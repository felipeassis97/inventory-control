export interface IFileSystemService {
    savePicture(uri: string, name: string): Promise<string>;
    deletePicture(uri: string): Promise<void>;
}