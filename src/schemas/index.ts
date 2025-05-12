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
    productStatus: z.string().min(1, { message: "Product Status is required" }),
})

export const ProductTypeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.string().min(1, { message: "Price is required" })
})
export const CreditNotesSchema = z.object({
    partyName: z.string().min(1, { message: "Party Name is required" }),
    creditNoteDate: z.string().min(1, { message: "Credit Note Date is required" }),
    invoiceId: z.string().min(1, { message: "Invoice No is required" }),
    gstin: z.string().optional(),
    addressline1: z.string().optional(),
    addressline2: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    pincode: z.string().optional(),
    cess: z.number().optional(),
    cgst: z.number().optional(),
    gst: z.number().optional(),
    sgst: z.number().optional(),
    igst: z.number().optional(),
    roundOff: z.number().optional(),
    grandTotal: z.number().optional(),
    documentUrl: z.any().optional(),
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
    addressId: z.number().optional(),
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
    addressId: z.number().optional(),
})
