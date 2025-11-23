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
    console.log(bookData);
    return response.data;
}

export async function updateBook(bookId, bookData) {
    const response = await AxiosConfig.put(`${RESOURCE}/${bookId}`, bookData);
    console.log(bookData);
    return response.data;
}

export async function deleteBook(bookId) {
    const response = await AxiosConfig.delete(`${RESOURCE}/${bookId}`
    );
    return response.data;
}

export async function fetchBooksSortTypes() {
    const response = await AxiosConfig.get(`${RESOURCE}/sortTypes`);
    return response.data;
}

export async function fetchSortedBooks(sortType) {
    const response = await AxiosConfig.get(`${RESOURCE}/sort?sortType=${sortType}`);
    return response.data;
}

export async function fetchFilteredAndSortedBooks(filter, sortType) {
    const response = await AxiosConfig.post(`${RESOURCE}/filterAndSort?sortType=${sortType}`, filter);
    return response.data;
}