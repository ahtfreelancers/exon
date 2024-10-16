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
    itemNo: z.string().min(1, { message: "Name is required" }),
    itemDescription: z.string().min(1, { message: "Brand Name is required" }),
    serialNumber: z.string().min(1, { message: "Serial Number is required" }),
    lotNumber: z.string().min(1, { message: "Lot No. is required" }),
    manufactureDate: z.string().min(1, { message: "Manufacture Date is required" }),
    expirationDate: z.string().min(1, { message: "Expiration Date is required" }),
    price: z.string().min(1, { message: "Price is required" }),
})
