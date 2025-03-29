/* eslint-disable no-useless-catch */
import { API_HOST } from "../constants/Api"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function request(endpoint: string, method: string, requestBody?: string): Promise<any> {
    try {
        const response = await fetch(API_HOST + endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: requestBody ? requestBody : null
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        if(response.status === 204){
            return null
        }
        try{
            return await response.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(e){
            return null;
        }
    } catch (err) {
        throw err;
    }
}