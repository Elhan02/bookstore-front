import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/auth";

export async function getUserProfile() {
    const response = await AxiosConfig.get(`${RESOURCE}/profile`);
    return response.data;
}