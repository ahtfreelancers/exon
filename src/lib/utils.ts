import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleResponse = (response: any) => {
  if (response?.isSuccess === true) {
    return {
      data: response.data,
      error: response.error,
      errorMessage: response.errorMessage,
      isSuccess: response?.isSuccess
    }
  }
}
