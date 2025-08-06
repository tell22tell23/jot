import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { v4 as uuidv4 } from 'uuid';
import { type FileMeta, FileSchema, type File } from '@/types';

const createFile = (files: FileMeta[], fileId: string, now: number): File => {
    const untitledFiles = files
    .map(f => f.title)
    .filter(title => /^Untitled(-\d+)?$/.test(title));

    // Extract numbers from existing Untitled titles
    const numbers = untitledFiles.map(title => {
        const match = title.match(/Untitled-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    });

    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const newNumber = maxNumber + 1;
    return {
        id: fileId,
        title: `Untitled-${newNumber}`,
        favorite: false,
        content: '',
        createdAt: now,
        updatedAt: now,
    };
}

interface FileStore {
    files: { [fileId: string]: string };
    currentFileId: string | null;  // Add this
    setCurrentFileId: (fileId: string) => void;
    setFileContent: (fileId: string, file: File) => void;
    getFileContent: (fileId: string) => File | null;
    getFileList: () => FileMeta[];
    createFile: () => FileMeta;
    renameFile: (fileId: string, newTitle: string) => void;
    deleteFile: (fileId: string) => void;
    fileExists: (title: string) => boolean;
}

export const useFileStore = create<FileStore>()(
    persist(
        (set, get) => ({
            files: {},
            currentFileId: null,  // Initialize currentFileId
            setCurrentFileId: (fileId) => {
                set({ currentFileId: fileId });
            },
            setFileContent: (fileId, file) => {
                const updatedFile: File = {
                    ...file,
                    updatedAt: Date.now(),
                }
                const compressedContent = compressToUTF16(JSON.stringify(updatedFile));
                set((state) => ({
                    files: {
                        ...state.files,
                        [fileId]: compressedContent,
                    },
                }));
            },
            getFileContent: (fileId) => {
                const compressedContent = get().files[fileId];
                if (!compressedContent) return null;
                try {
                    const jsonContent = decompressFromUTF16(compressedContent);
                    if (!jsonContent) return null;
                    const parsedContent = JSON.parse(jsonContent);
                    return FileSchema.parse(parsedContent);
                } catch (error) {
                    console.error('Error decompressing file content:', error);
                    return null;
                }
            },
            getFileList: () => {
                return Object.entries(get().files)
                    .map(([id, compressed]) => {
                        const json = decompressFromUTF16(compressed);
                        const file = json ? JSON.parse(json) : null;
                        return {
                            id,
                            title: file?.title ?? "Untitled",
                            favorite: file?.favorite ?? false,
                            updatedAt: file?.updatedAt ?? 0,
                        };
                    })
                    .sort((a, b) => b.updatedAt - a.updatedAt);
            },
            createFile: () => {
                const fileId = uuidv4();
                const now = Date.now();
                const files = get().getFileList();
                const newFile = createFile(files, fileId, now);
                const compressedContent = compressToUTF16(JSON.stringify(newFile));
                set((state) => ({
                    files: {
                        ...state.files,
                        [fileId]: compressedContent,
                    },
                }));

                return {
                    id: fileId,
                    title: newFile.title,
                    favorite: newFile.favorite,
                    updatedAt: newFile.updatedAt,
                };
            },
            renameFile: (fileId, newTitle) => {
                const fileContent = get().getFileContent(fileId);
                if (!fileContent) return;

                const updatedFile: File = {
                    ...fileContent,
                    title: newTitle,
                    updatedAt: Date.now(),
                };
                const compressedContent = compressToUTF16(JSON.stringify(updatedFile));
                set((state) => ({
                    files: {
                        ...state.files,
                        [fileId]: compressedContent,
                    },
                }));
            },
            deleteFile: (fileId) => {
                set((state) => {
                    const { [fileId]: _disgarded, ...remainingFiles } = state.files;
                    return { files: remainingFiles };
                });
            },
            fileExists: (title: string) => {
                const files = Object.values(get().files)
                .map((compressed) => {
                    const json = decompressFromUTF16(compressed);
                    return json ? JSON.parse(json) : null;
                })
                .filter(Boolean);

                return files.some((file) => file.title === title);
            },
        }),
        {
            name: 'file-storage',
            onRehydrateStorage: () => (state) => {
                if (!state || !state.files || Object.keys(state.files).length > 0) return;
                const now = Date.now();
                const fileId = uuidv4();
                const files = state.getFileList();
                const newFile = createFile(files, fileId, now);
                const compressed = compressToUTF16(JSON.stringify(newFile));
                state.files = { [fileId]: compressed };
                state.currentFileId = fileId;
            },
        }
    )
);
