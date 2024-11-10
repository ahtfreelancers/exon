"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllDistributors(params: any) {
    try {
        const response = await agent.Distributors.getDistributors(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addDistributor(data: any) {
    try {
        const response = await agent.Distributors.createDistributor(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getDistributor(id: any) {
    try {
        const response = await agent.Distributors.getDistributorById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteDistributor(id: any) {
    try {
        const response = await agent.Distributors.deleteDistributor(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
