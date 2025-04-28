"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllTransport(params: any) {
    try {
        const response = await agent.Transport.getTransport(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addTransport(data: any) {
    try {
        const response = await agent.Transport.createTransport(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getTransport(id: any) {
    try {
        const response = await agent.Transport.getTransportById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteTransport(id: any) {
    try {
        const response = await agent.Transport.deleteTransport(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
