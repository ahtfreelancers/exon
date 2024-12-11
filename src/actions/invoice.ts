"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllInvoices(params: any) {
    try {
        const response = await agent.Invoice.getInvoice(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}
export async function getAllInvoicesPdf(id: any) {
    try {
        const response = await agent.Invoice.getInvoicePdf(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addInvoice(data: any) {
    try {
        const response = await agent.Invoice.createInvoice(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getInvoice(id: any) {
    try {
        const response = await agent.Invoice.getInvoiceById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteInvoice(id: any) {
    try {
        const response = await agent.Invoice.deleteInvoice(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
export async function updateInvoice(id: any, data: any) {
    try {
        const response = await agent.Invoice.updateInvoice(id, data);
        return handleResponse(response);
    } catch (error) {
        console.error("Update Invoice error", error);
        return {
            error,
        };
    }
}