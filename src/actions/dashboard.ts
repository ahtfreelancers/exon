"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getDashboardData() {
  try {
    const response = await agent.Dashboard.getDashboard()
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}