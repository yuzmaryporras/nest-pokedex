import axios, { AxiosInstance } from "axios";
import { httpAdapter } from "../interfaces/http-adapter.interfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements httpAdapter {

    private axios: AxiosInstance = axios;

    get<T>(url: string): Promise<T> {
        try{
            const { data } = this.axios.get<T>( url );
            return data;

        }catch(error){
            throw new Error('This is an error - check logs');
        }
    }
    
}