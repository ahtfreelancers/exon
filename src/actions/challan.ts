"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllChallan(params: any) {
    try {
        const response = await agent.Challan.getChallan(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}
export async function getAllChallanPdf(id: any) {
    try {
        const response = await agent.Challan.getChallanPdf(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addChallan(data: any) {
    try {
        const response = await agent.Challan.createChallan(data)
        return handleResponse(response)
    } catch (error) {
        console.error("Add Challan error", error);
        return {
            error,
        };
    }
}

export async function getChallan(id: any) {
    try {
        const response = await agent.Challan.getChallanById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteChallan(id: any) {
    try {
        const response = await agent.Challan.deleteChallan(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
export async function updateChallan(id: any, data: any) {
    try {
        const response = await agent.Challan.updateChallan(id, data);
        return handleResponse(response);
    } catch (error) {
        console.error("Update Challan error", error);
        return {
            error,
        };
    }
}