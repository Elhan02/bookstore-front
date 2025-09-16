import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/authors";

export async function getAllAuthors() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export async function getAuthorById(authorId) {
    const response = await AxiosConfig.get(`${RESOURCE}/${authorId}`);
    return response.data;
}

export async function createAuthor(authorData) {
    const response = await AxiosConfig.post(RESOURCE, authorData);
    return response.data;
}