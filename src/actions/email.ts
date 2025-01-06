"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function sharePdfWithEmail(data: any) {
    try {
        const response = await agent.SharePdf.sharePdf(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}