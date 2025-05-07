"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllCreditNotes(params: any) {
    try {
        const response = await agent.CreditNotes.getCreditNotes(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}
export async function getAllLedgers(params: any) {
    try {
        const response = await agent.CreditNotes.getAllLedgers(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addCreditNote(data: any) {
    try {
        const response = await agent.CreditNotes.createCreditNote(data)
        return handleResponse(response)
    } catch (error) {
        console.log("Add Credit Notes error", error);
        // throw error;
        return {
            error,
        };
    }
}

export async function getCreditNote(id: any) {
    try {
        const response = await agent.CreditNotes.getCreditNoteById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function updateCreditNote(id: any, data: any) {
    try {
        const response = await agent.CreditNotes.updateCreditNote(id, data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteCreditNote(id: any) {
    try {
        const response = await agent.CreditNotes.deleteCreditNote(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete Credit Notes error", error);
        return {
            error,
        };
    }
}
export async function getCreditNotePDFById(id: any) {
    try {
        const response = await agent.CreditNotes.getCreditNotePDF(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}