import { API_HOST } from "../constants/Api"

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
        }catch(e){
            return null;
        }
    } catch (err) {
        throw err;
    }
}