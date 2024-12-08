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

export const ProductTypeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.string().min(1, { message: "Price is required" })
})

export const HospitalSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    gstNumber: z.string().min(1, { message: "Gst Number is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
    panNumber: z.string().min(1, { message: "Pan Number is required" }),
    address1: z.string().min(1, { message: "Address 1 is required" }),
    address2: z.string().min(1, { message: "Address 2 is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    pinCode: z.string().min(1, { message: "Pincode is required" }),
})

export const DistributorSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    gstNumber: z.string().min(1, { message: "Gst Number is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
    panNumber: z.string().min(1, { message: "Pan Number is required" }),
    address1: z.string().min(1, { message: "Address 1 is required" }),
    address2: z.string().min(1, { message: "Address 2 is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    pinCode: z.string().min(1, { message: "Pincode is required" }),
})
