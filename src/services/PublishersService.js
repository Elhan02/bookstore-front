import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/publishers";

export async function getAllPublishers() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export async function getPublisherById(id) {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}

export async function createPublisher(publisherData) {
    const response = await AxiosConfig.post(RESOURCE, publisherData);
    return response.data;
}