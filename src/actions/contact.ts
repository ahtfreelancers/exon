"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllContact(params: any) {
  try {
    const response = await agent.Contact.getContact(params)
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}
export async function createContactForm(params: any) {
  try {
    console.log("params", params);
    const response = await agent.Contact.createContact(params)
    return handleResponse(response)
  } catch (error) {
    console.log("error", error);
    return {
      error,
    };
  }
}