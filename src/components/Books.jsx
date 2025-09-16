import React, { useEffect, useState } from "react";
import { getAllBooks, deleteBook } from "../services/BooksService";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function loadBooks() {
        try {
            setLoading(true);
            const data = await getAllBooks();
            setBooks(data);
        } catch (error) {
            if (error.status && error.status === 500) {
                setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while fetching Books:", error);
        }
        setLoading(false);
    }

    async function handleDelete(bookId) {
        try {
            await deleteBook(bookId);
            loadBooks();
        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
                } else if (error.status === 404) {
                    setErrorMsg(`Book with ID: ${bookId} can not be found.`);
                }
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while deleting book:", error);
        }
    }

    useEffect(() => {
        loadBooks();

        return (
            console.log('Books page unmounted.')
        );
    }, [])

    return (
        <div className="books">
            <h1>Books page</h1>
            {loading && <Spinner />}
            {errorMsg && <p>{errorMsg}</p>}
            <table className="books-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Pages</th>
                        <th>ISBN</th>
                        <th>Publication date</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.pageCount}</td>
                            <td>{book.isbn}</td>
                            <td>{new Date(book.publishedDate).toLocaleDateString('en-US')}</td>
                            <td>{book.author.fullName}</td>
                            <td>{book.publisher.name}</td>
                            <td><button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button></td>
                            <td><button className="edit-btn" onClick={() => {navigate(`/update-book/${book.id}`)}}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books;