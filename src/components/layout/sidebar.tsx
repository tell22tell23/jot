"use client";

import { useRef, useState } from "react";
import { useFileStore } from "@/hooks/use-file-store";
import { Button } from "../ui/button";
import { CirclePlus, File, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";

export function Sidebar() {
    const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
    const [tempTitle, setTempTitle] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        createFile,
        getFileList,
        currentFileId,
        setCurrentFileId,
        deleteFile,
        renameFile,
    } = useFileStore();
    const files = getFileList();

    const handleRename = (fileId: string) => {
        console.log(tempTitle.trim());
        if (tempTitle.trim() !== "") {
            renameFile(fileId, tempTitle.trim());
        }
        setRenamingFileId(null);
    }

    return (
        <section className="h-full pt-10">
            <div className="flex flex-col gap-y-2 h-full">
                { files.length > 0 ?
                    files.map((file) => (
                        <ContextMenu
                            key={file.id}
                        >
                            <ContextMenuTrigger
                                onClick={() => setCurrentFileId(file.id)}
                                className="hover:bg-accent/30 px-3 py-2 flex items-center justify-between rounded-sm text-sm cursor-pointer gap-x-4"
                            >
                                <div className="flex items-center gap-x-4">
                                    <File
                                        className={
                                            cn(
                                                "size-3 text-muted-foreground flex-shrink-0",
                                                file.id === currentFileId ? "text-indigo-700" : ""
                                            )
                                        }
                                    />
                                    { renamingFileId === file.id ? (
                                        <input
                                            ref={inputRef}
                                            value={tempTitle}
                                            onChange={(e) => setTempTitle(e.target.value)}
                                            onBlur={() => handleRename(file.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") handleRename(file.id);
                                                if (e.key === "Escape") setRenamingFileId(null);
                                            }}
                                            autoFocus
                                            className="w-full bg-transparent outline-none text-sm px-1 border border-indigo-500 rounded-sm"
                                            style={{ caretColor: 'auto' }}
                                        />
                                    ) : (
                                        <span className="truncate">{file.title}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="p-1 size-6 rounded-sm"
                                        onClick={() => deleteFile(file.id)}
                                    >
                                        <Trash2
                                            className={cn(
                                                "size-3 text-red-500",
                                            )}
                                        />
                                    </Button>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem
                                    onClick={() => {
                                        setRenamingFileId(file.id);
                                        setTempTitle(file.title);
                                        setTimeout(() => {
                                            inputRef.current?.focus();
                                        }, 0);
                                    }}
                                >
                                    Rename
                                </ContextMenuItem>
                                <ContextMenuItem
                                    onClick={() => deleteFile(file.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    ))
                    : (
                        <div className="text-center text-muted-foreground py-4 text-sm">
                            No files available. Click &quot;New File&quot; to create one.
                        </div>
                    )}
                <Button
                    variant="ghost"
                    className="px-3 flex items-center justify-start rounded-sm gap-x-4 text-sm"
                    onClick={() => {
                        const newFile = createFile(); // Assume this returns the new file object with id & title

                        setCurrentFileId(newFile.id);
                        setRenamingFileId(newFile.id);
                        setTempTitle(newFile.title || "");

                        setTimeout(() => {
                            inputRef.current?.focus();
                            inputRef.current?.select();
                        }, 0);
                    }}
                >
                    <CirclePlus className="size-3 text-indigo-700" />
                    <span>New File</span>
                </Button>
            </div>
        </section>
    );
}
