import { z } from "zod";

export const ZUnBlockIdeaTrpcInput = z.object({
    ideaId: z.string().min(1)
})