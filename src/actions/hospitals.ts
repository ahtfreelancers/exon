"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllHospitals(params: any) {
    try {
        const response = await agent.Hospitals.getHospitals(params)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function addHospital(data: any) {
    try {
        const response = await agent.Hospitals.createHospital(data)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function getHospital(id: any) {
    try {
        const response = await agent.Hospitals.getHospitalById(id)
        return handleResponse(response)
    } catch (error) {
        return {
            error,
        };
    }
}

export async function deleteHospital(id: any) {
    try {
        const response = await agent.Hospitals.deleteHospital(id);
        return handleResponse(response);
    } catch (error) {
        console.error("Delete medicine error", error);
        return {
            error,
        };
    }
}
