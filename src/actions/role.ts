"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";
export async function getAllRole(params: any) {
  try {
    const response = await agent.Role.getRole(params)
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}
export async function getAllPermissions(params: any) {
  try {
    const response = await agent.Role.getPermissionsByRoleId(params)

    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}

export async function updateRolePermissions(data: any) {
  try {
    const response = await agent.Role.updatePermissions(data)
    console.log('response', response);

    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}