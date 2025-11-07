import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/volumes";

export async function searchVolumes(search) {
    const response = await AxiosConfig.get(`${RESOURCE}/search?filter=${search}`);
    return response.data;
}