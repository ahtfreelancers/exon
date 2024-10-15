import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
})

export const MedicineSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    brandName: z.string().min(1, { message: "Brand Name is required" }),
    lotNo: z.string().min(1, { message: "Lot No. is required" }),
    batchNo: z.string().min(1, { message: "Batch No. is required" }),
    manufactureDate: z.string().min(1, { message: "Manufacture Date is required" }),
    expirationDate: z.string().min(1, { message: "Expiration Date is required" }),
    price: z.string().min(1, { message: "Price is required" }),
})
