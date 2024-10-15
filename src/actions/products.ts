"use server";

import agent from "@/app/api/axios";
import { handleResponse } from "@/lib/utils";

export async function getAllProducts(params: any) {
  try {
    const response = await agent.Products.getProducts(params)
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}

export async function addProduct(data: any) {
  try {
    const response = await agent.Products.createProduct(data)
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getProduct(id: any) {
  try {
    const response = await agent.Products.getProductById(id)
    return handleResponse(response)
  } catch (error) {
    return {
      error,
    };
  }
}

export async function deleteProduct(id: any) {
  try {
    const response = await agent.Products.deleteProduct(id);
    return handleResponse(response);
  } catch (error) {
    console.error("Delete medicine error", error);
    return {
      error,
    };
  }
}

export async function productStatusUpdate(serialNumber: any) {
  try {
    const response = await agent.Products.productStatusUpdate(serialNumber);
    return handleResponse(response);
  } catch (error) {
    console.error("Update product error", error);
    return {
      error,
    };
  }
}
