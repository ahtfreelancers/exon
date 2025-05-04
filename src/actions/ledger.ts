"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllLedger(params: any) {
    try {
        const response = await agent.Ledger.getLedger(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addLedger(data: any) {
    try {
        const response = await agent.Ledger.createLedger(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getLedger(id: any) {
    try {
        const response = await agent.Ledger.getLedgerById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteLedger(id: any) {
    try {
        const response = await agent.Ledger.deleteLedger(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
