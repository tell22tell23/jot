import * as z from "zod";

export const FontSchema = z.enum(["sans", "mono", "serif"]);
export type Font = z.infer<typeof FontSchema>;

export const FileSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    favorite: z.boolean().default(false),
    createdAt: z.number(),
    updatedAt: z.number(),
});
export type File = z.infer<typeof FileSchema>;

export const FileMetaSchema = z.object({
    id: z.string(),
    title: z.string(),
    favorite: z.boolean().default(false),
    updatedAt: z.number(),
});
export type FileMeta = z.infer<typeof FileMetaSchema>;
