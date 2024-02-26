import axios from "axios";
import { IsignUp } from "../types/Interface";








export async function signUp(user: IsignUp) {
  try {
    const response = await axios.post("http://localhost:7000/api/user", user);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getUser(data) {
  try {
    const response = axios.post(`http://localhost:7000/api/login`,data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}