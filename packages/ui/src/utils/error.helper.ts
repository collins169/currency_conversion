import { HTTPStatusCodes } from "../constants/statusCode";
import axios, { AxiosResponse } from "axios";

export function is409ConflictError(error: Error): boolean {
  return axios.isAxiosError(error) && error.response?.status === HTTPStatusCodes.CONFLICT;
}

export function is404NotError(error: Error): boolean {
  return axios.isAxiosError(error) && error.response?.status === HTTPStatusCodes.NOT_FOUND;
}

export function is500InternalServerError(error: Error): boolean {
  return axios.isAxiosError(error) && error.response?.status === HTTPStatusCodes.SERVER_ERROR;
}

export const getErrorMessage = (error: Error): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return "Unable to reach server";
    }

		const response = error.response as AxiosResponse
    const {
      data
    } = response;

    if (data?.message) {
			if (Array.isArray(data?.message)){
				return data?.message?.toString();
			} 
			return data.message;
    }
  }
  return error.message;
};
