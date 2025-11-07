import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/issues";

export async function getIssuesByVolumeId(id) {
    const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
    return response.data;
}

export async function addIssueToStore(issueData) {
    const response = await AxiosConfig.post(`${RESOURCE}`, issueData);
    return response.data;
}