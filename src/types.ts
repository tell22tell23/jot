import * as z from "zod";

export const FontSchema = z.enum(["sans", "mono", "serif"]);
export type Font = z.infer<typeof FontSchema>;
