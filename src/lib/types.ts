export interface InvoiceItems {
  id: number,
  product: {
    id: number,
    itemNo: string,
    itemDescription: string,
    serialNumber: string,
    lotNumber: string,
    manufactureDate: string,
    expirationDate: string,
    productStatus: number
  },
  quantity: number,
  rpuwg: number,
  rpuwog: number,
  discountType: number,
  discount: number,
  gst: string,
  total: number
}

export interface Invoice {
  id: number,
  hospital?: {
    id: number,
    name: string,
    gstNumber: string,
    phoneNumber: string,
    panNumber: string,
    address: {
      id?: number,
      address1: string,
      address2: string,
      city: string,
      state: string,
      pinCode: string
    }
  },
  distributor?: {
    id: number,
    name: string,
    gstNumber: string,
    phoneNumber: string,
    panNumber: string,
    address: {
      id?: number,
      address1: string,
      address2: string,
      city: string,
      state: string,
      pinCode: string
    }
  },
  shipping: number,
  packingCharge: number,
  cess: number,
  cgst: number,
  sgst: number,
  igst: number,
  roundOffAmount: number,
  grandTotal: number,
  invoiceType: number,
  invoiceItems: InvoiceItems[]
  created: string
  modified: string
}

export interface InvoiceFormProps {
  type: number;
  challan?: any;
  hospitals?: any;
  distributors?: any;
  invoiceId?: any;
  isEdit?: boolean;
  transport?: any;
  productTypes?: any;
}