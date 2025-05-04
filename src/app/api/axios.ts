import { auth } from '../../../auth';
import axios, { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const API_BASE_URL = process.env.API_BASE_URL;

// axios.defaults.baseURL = process.env.API_BASE_URL
// axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.request.use(
    async (config) => {
        let session: any

        if (typeof getSession === 'function') {
            session = await getSession()
        } else {
            session = await auth()
        }

        if (session && 'user' in session) {
            config.headers.Authorization = `bearer ${session?.user?.access_token}`
        } else if (session) {
            session.then((res: any) => {
                if (res && res?.user?.access_token) {
                    config.headers.Authorization = `bearer ${res?.user?.access_token}`
                }
            })
        }

        return config
    },
    (error) => {
        console.log("errorerrorerrorerrorerrorerror1111111111111111111111", error);

        if (error.response && error.response.status === 401) {
            console.log("errorerrorerror", error);

            window.location.href = '/exon-admin'
            return Promise.reject('Unauthorized')
        }
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response.status === 401) {
            let session: any

            if (typeof getSession === 'function') {
                session = await getSession()
            } else {
                session = await auth()
            }

            if (!session) {
                return redirect('/exon-admin')
            }
        }

        return Promise.reject(error)
    }
)

function createFormData(item: any) {
    const formData = new FormData()
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData
}

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: any) => axios.post(url, body).then(responseBody),
    put: (url: string, body: any) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) =>
        axios
            .post(url, data, {
                headers: { 'Content-type': 'multipart/form-data' },
            })
            .then(responseBody),
    putForm: (url: string, data: FormData) =>
        axios
            .put(url, data, {
                headers: { 'Content-type': 'multipart/form-data' },
            })
            .then(responseBody),
}

const Products = {
    getProducts: (params: any) => requests.get(`${API_BASE_URL}/products`, params),
    createProduct: (data: any) => requests.post(`${API_BASE_URL}/products`, data),
    updateProduct: (id: any, data: any) => requests.put(`${API_BASE_URL}/products/${id}`, data),
    deleteProduct: (id: number) => requests.delete(`${API_BASE_URL}/products/${id}`),
    getProductById: (id: number) => requests.get(`${API_BASE_URL}/products/${id}`),
    productStatusUpdate: (serialNumber: string) => requests.put(`${API_BASE_URL}/products/statusupdate/${serialNumber}`, { serialNumber }),
    productBulkUpload: (data: any) => requests.post(`${API_BASE_URL}/products/upload`, data),
    getProductBySerialNumber: (serialNumber: string) => requests.get(`${API_BASE_URL}/products/byserialnumber/${serialNumber}`),
}

const Contact = {
    getContact: (params: any) => requests.get(`${API_BASE_URL}/contactus`, params),
    createContact: (data: any) => requests.post(`${API_BASE_URL}/contactus`, data),
}
const Dashboard = {
    getDashboard: () => requests.get(`${API_BASE_URL}/dashboard`),
}

const Hospitals = {
    getHospitals: (params: any) => requests.get(`${API_BASE_URL}/hospitals`, params),
    createHospital: (data: any) => requests.post(`${API_BASE_URL}/hospitals`, data),
    updateHospital: (id: any, data: any) => requests.put(`${API_BASE_URL}/hospitals/${id}`, data),
    deleteHospital: (id: number) => requests.delete(`${API_BASE_URL}/hospitals/${id}`),
    getHospitalById: (id: number) => requests.get(`${API_BASE_URL}/hospitals/${id}`),
    hospitalProductMapping: (data: any) => requests.post(`${API_BASE_URL}/hospitals/hospitalproductmapping`, data),
}
const Transport = {
    getTransport: (params: any) => requests.get(`${API_BASE_URL}/transport`, params),
    createTransport: (data: any) => requests.post(`${API_BASE_URL}/transport`, data),
    updateTransport: (id: any, data: any) => requests.put(`${API_BASE_URL}/transport/${id}`, data),
    deleteTransport: (id: number) => requests.delete(`${API_BASE_URL}/transport/${id}`),
    getTransportById: (id: number) => requests.get(`${API_BASE_URL}/transport/${id}`),
}

const Distributors = {
    getDistributors: (params: any) => requests.get(`${API_BASE_URL}/distributors`, params),
    createDistributor: (data: any) => requests.post(`${API_BASE_URL}/distributors`, data),
    updateDistributor: (id: any, data: any) => requests.put(`${API_BASE_URL}/distributors/${id}`, data),
    deleteDistributor: (id: number) => requests.delete(`${API_BASE_URL}/distributors/${id}`),
    getDistributorById: (id: number) => requests.get(`${API_BASE_URL}/distributors/${id}`),
    distributorProductMapping: (data: any) => requests.post(`${API_BASE_URL}/distributors/distributorproductmapping`, data),
}

const ProductTypes = {
    getProductTypes: (params: any) => requests.get(`${API_BASE_URL}/producttypes`, params),
    createProductType: (data: any) => requests.post(`${API_BASE_URL}/producttypes`, createFormData(data)),
    getProductTypeById: (id: number) => requests.get(`${API_BASE_URL}/producttypes/${id}`),
    deleteProductType: (id: number) => requests.delete(`${API_BASE_URL}/producttypes/${id}`),
    updateProductType: (id: any, data: any) => requests.put(`${API_BASE_URL}/producttypes/${id}`, createFormData(data)),
}
const Invoice = {
    getInvoice: (params: any) => requests.get(`${API_BASE_URL}/invoices`, params),
    getInvoicePdf: (id: any) => requests.get(`${API_BASE_URL}/invoices/getInvoicePDF/${id}`),
    createInvoice: (data: any) => requests.post(`${API_BASE_URL}/invoices`, data),
    updateInvoice: (id: any, data: any) => requests.put(`${API_BASE_URL}/invoices/${id}`, data),
    getInvoiceById: (id: number) => requests.get(`${API_BASE_URL}/invoices/${id}`),
    deleteInvoice: (id: number) => requests.delete(`${API_BASE_URL}/invoices/${id}`),
}
const Role = {
    getRole: (params: any) => requests.get(`${API_BASE_URL}/roles`, params),
    getPermissionsByRoleId: (params: any) => requests.get(`${API_BASE_URL}/permissions`, params),
    updatePermissions: (data: any) => requests.put(`${API_BASE_URL}/permissions`, data),
}
const Challan = {
    getChallan: (params: any) => requests.get(`${API_BASE_URL}/deliveryChallan`, params),
    getChallanPdf: (id: any) => requests.get(`${API_BASE_URL}/deliveryChallan/getChallanPDF/${id}`),
    createChallan: (data: any) => requests.post(`${API_BASE_URL}/deliveryChallan`, createFormData(data)),
    updateChallan: (id: any, data: any) => requests.put(`${API_BASE_URL}/deliveryChallan/${id}`, createFormData(data)),
    getChallanById: (id: number) => requests.get(`${API_BASE_URL}/deliveryChallan/${id}`),
    deleteChallan: (id: number) => requests.delete(`${API_BASE_URL}/deliveryChallan/${id}`),
}
const SharePdf = {
    sharePdf: (data: any) => requests.post(`${API_BASE_URL}/emails`, data),
}
const Ledger = {
    getLedger: (params: any) => requests.get(`${API_BASE_URL}/ledger`, params),
    createLedger: (data: any) => requests.postForm(`${API_BASE_URL}/ledger`, data),
    updateLedger: (id: any, data: any) => requests.putForm(`${API_BASE_URL}/ledger/${id}`, data),
    deleteLedger: (id: number) => requests.delete(`${API_BASE_URL}/ledger/${id}`),
    getLedgerById: (id: number) => requests.get(`${API_BASE_URL}/ledger/${id}`),
}

const agent = {
    Products,
    Contact,
    Hospitals,
    Distributors,
    Dashboard,
    ProductTypes,
    Invoice,
    Challan,
    SharePdf,
    Transport,
    Role,
    Ledger,
}

export default agent
