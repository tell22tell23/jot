"use client";

import { useFileStore } from "@/hooks/use-file-store";
import { Button } from "../ui/button";
import { CirclePlus, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditMenu } from "../edit-menu";

export function Sidebar() {
    const {
        createFile,
        getFileList,
        currentFileId,
        setCurrentFileId,
    } = useFileStore();
    const files = getFileList();

    return (
        <section className="h-full w-[280px] pt-10">
            <div className="flex flex-col gap-y-2 h-full">
                { files.length > 0 ?
                    files.map((file) => (
                        <Button
                            key={file.id}
                            variant="ghost"
                            onClick={() => setCurrentFileId(file.id)}
                            className="hover:bg-none dark:hover:bg-none px-3 flex items-center justify-between rounded-sm text-sm"
                        >
                            <div className="flex items-center gap-x-4">
                                <File
                                    className={
                                        cn(
                                            "size-3 text-muted-foreground",
                                            file.id === currentFileId ? "text-indigo-700" : ""
                                        )
                                    }
                                />
                                <span className="truncate">{file.title}</span>
                            </div>
                            <EditMenu file={file} />
                        </Button>
                    ))
                    : (
                        <div className="text-center text-muted-foreground py-4 text-sm">
                            No files available. Click "New File" to create one.
                        </div>
                    )}
                <Button
                    variant="ghost"
                    className="px-3 flex items-center justify-start rounded-sm gap-x-4 text-sm"
                    onClick={() => createFile()}
                >
                    <CirclePlus className="size-3 text-indigo-700" />
                    <span>New File</span>
                </Button>
            </div>
        </section>
    );
}
