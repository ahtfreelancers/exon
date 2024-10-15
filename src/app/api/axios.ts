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

            window.location.href = '/login'
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
                return redirect('/login')
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
}

const Contact = {
    getContact: (params: any) => requests.get(`${API_BASE_URL}/contactus`, params),
}

const agent = {
    Products,
    Contact
}

export default agent
