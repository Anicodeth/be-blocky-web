"use server"

import { PaymentData } from "@/types";
import axios from "axios";


export async function initializePayment(data: PaymentData) {
    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
    });
    return response
}