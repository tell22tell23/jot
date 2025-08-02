"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFileStore } from "@/hooks/use-file-store";
import { type FileMeta } from "@/types";
import { EllipsisVertical } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function EditMenu({ file }: { file: FileMeta }) {
    const { deleteFile, renameFile, fileExists } = useFileStore();

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="hover:bg-gray-100 dark:hover:bg-accent p-1 rounded">
                        <EllipsisVertical className="size-3 text-muted-foreground" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <DialogTrigger asChild>
                            <div>Edit</div>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => deleteFile(file.id)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* This goes outside DropdownMenuContent so it doesn't get unmounted */}
            <DialogContent className="sm:max-w-[425px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const title = formData.get("title")?.toString().trim() as string;
                        if (fileExists(title)) {
                            toast.error("File with this title already exists.");
                            return;
                        }
                        renameFile(file.id, title);
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit File</DialogTitle>
                        <DialogDescription>
                            Modify the file details here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" defaultValue={file.title} />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
