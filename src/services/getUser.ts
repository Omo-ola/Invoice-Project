import axios from "axios";
import { IsignUp } from "../types/Interface";

const address = "https://invoice-api-1.onrender.com/";
// const address = "http://localhost:7000/";








export async function signUp(user: IsignUp) {
  try {
    const response = await axios.post(`${address}api/user`, user);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}


export async function getUser(data:any) {
  try {
    const response = axios.post(`${address}api/login`, data);
    return response;
  } catch (error:any) {
    throw new Error(error.message);
  }
}



export async function getLoginUser() {
  try {
    const response = axios.get(`${address}api/user/auth`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error getting user");
  }
}