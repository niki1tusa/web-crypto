import { z } from "zod";

export const ZBlockIdeaTrpcInput = z.object({
    ideaId: z.string().min(1)
})