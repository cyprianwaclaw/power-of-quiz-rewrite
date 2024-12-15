import axios from 'axios';
import { useAuth } from "@/stores/useAuth";

export default defineNuxtPlugin(() => {

    const auth = useAuth();
    const token = auth?.token
    const API_URL = useRuntimeConfig().public.API_URL
    const axiosInstanceData = axios.create({
        baseURL: API_URL,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token || ''}`,
        },
    });

    return {
        provide: {
            axiosInstanceData: axiosInstanceData
        }
    }
})