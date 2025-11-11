import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/bookreviews";

export async function addBookReview(review) {
    const response = await AxiosConfig.post(`${RESOURCE}`, review);
    return response.data;
}