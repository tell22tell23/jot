import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { v4 as uuidv4 } from 'uuid';
import { type FileMeta, FileSchema, type File } from '@/types';


interface FileStore {
    files: { [fileId: string]: string };
    currentFileId: string | null;  // Add this
    setCurrentFileId: (fileId: string) => void;
    setFileContent: (fileId: string, file: File) => void;
    getFileContent: (fileId: string) => File | null;
    getFileList: () => FileMeta[];
    createFile: () => void;
    deleteFile: (fileId: string) => void;
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
                } catch (error: any) {
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
                            updatedAt: file?.updatedAt ?? 0,
                        };
                    })
                    .sort((a, b) => b.updatedAt - a.updatedAt);
            },
            createFile: () => {
                const fileId = uuidv4();
                const now = Date.now();
                const newFile: File = {
                    id: fileId,
                    title: `File ${now}`,
                    content: '',
                    createdAt: now,
                    updatedAt: now,
                };
                const compressedContent = compressToUTF16(JSON.stringify(newFile));
                set((state) => ({
                    files: {
                        ...state.files,
                        [fileId]: compressedContent,
                    },
                }));
            },
            deleteFile: (fileId) => {
                set((state) => {
                    const { [fileId]: _, ...remainingFiles } = state.files;
                    return { files: remainingFiles };
                });
            },
        }),
        {
            name: 'file-storage',
            onRehydrateStorage: () => (state) => {
                if (!state || !state.files || Object.keys(state.files).length > 0) return;
                const now = Date.now();
                const fileId = uuidv4();
                const newFile: File = {
                    id: fileId,
                    title: `File ${now}`,
                    content: '',
                    createdAt: now,
                    updatedAt: now,
                };
                const compressed = compressToUTF16(JSON.stringify(newFile));
                state.files = { [fileId]: compressed };
                state.currentFileId = fileId;
            },
        }
    )
);
