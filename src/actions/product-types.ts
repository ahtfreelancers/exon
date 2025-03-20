"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllProductTypes(params: any) {
    try {
        const response = await agent.ProductTypes.getProductTypes(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addProductType(data: any) {
    try {
        const response = await agent.ProductTypes.createProductType(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getProductType(id: any) {
    try {
        const response = await agent.ProductTypes.getProductTypeById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function updateProductType(id: any, data: any) {
    try {
        const response = await agent.ProductTypes.updateProductType(id, data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteProductType(id: any) {
    try {
        const response = await agent.ProductTypes.deleteProductType(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete product type error", error);
        return {
            error,
        };
    }
}
