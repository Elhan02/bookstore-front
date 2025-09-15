import AxiosConfig from "../config/AxiosConfig";

const RESOURCE = "/api/books";

export async function getAllBooks() {
    const response = await AxiosConfig.get(RESOURCE);
    return response.data;
}

export async function getBookById(bookId) {
    const response = await AxiosConfig.get(`${RESOURCE}/${bookId}`);
    return response.data;
}

export async function createBook(bookData) {
    const response = await AxiosConfig.post(RESOURCE, bookData);
    return response.data;
}

export async function deleteBook(bookId) {
    const response = await AxiosConfig.delete(`${RESOURCE}/${bookId}`
    );
    return response.data;
}