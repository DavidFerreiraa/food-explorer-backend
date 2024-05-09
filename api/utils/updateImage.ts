import { DiskStorage } from "../src/provider/DiskStorage";

export interface IUpdateImage {
    imageUrl?: string,
    newImageFile: string
}

export async function updateImage({imageUrl = "NOT_FOUND", newImageFile}: IUpdateImage) {
    const diskStorage = new DiskStorage();

    await diskStorage.deleteFile(imageUrl);

    const newImageUrl = await diskStorage.saveFile(newImageFile);
    return  newImageUrl;
}