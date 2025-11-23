import React, { useContext, useEffect, useState } from "react";
import { getAllBooks, deleteBook, fetchSortedBooks, fetchBooksSortTypes } from "../services/BooksService";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "./PagesElements/Spinner";
import UserContext from "./UserContext";
import AddReviewModal from "./AddReviewModal";
import { addBookReview } from "../services/BookReviewsService";
import SortDropdown from "./PagesElements/SortDropdown";

const Books = () => {
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [chosenSortType, setChosenSortType] = useState(0);
    const [sortTypes, setSortTypes] = useState([]);

    const navigate = useNavigate();

    async function loadBooks() {
        try {
            setLoading(true);
            const data = await fetchSortedBooks(chosenSortType);
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

    async function loadSortTypes() {
        try {
            setLoading(true);
            const types = await fetchBooksSortTypes();
            setSortTypes(types);
        } catch (error) {
            if (error.status && error.status === 500) {
                setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while fetching Books sort types:", error);
        }
        setLoading(false);
    }

    const handleSortTypeChange = (sortType) => {
        setChosenSortType(sortType);
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

    async function handleSaveReview(review) {
        try {
            await addBookReview(review);
            loadBooks();
            setSelectedBook(null);
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
            console.log("An error occurred while creating review:", error);
        }
    }

    useEffect(() => {
        loadSortTypes();
        loadBooks();
        return (
            console.log('Books page unmounted.')
        );
    }, [])

    useEffect(() => {
        loadBooks();
    }, [chosenSortType]);

    return (
        <div>
            <h1>Books page</h1>

            <div className="sort-dropdown-container" style={{ margin: "50px 10% 10%", width: "20%" }}>
                <SortDropdown sortType={chosenSortType} onSelect={handleSortTypeChange} sortTypes={sortTypes} />
            </div>

            <div className="table-wrapper">

                {loading && <Spinner />}
                {errorMsg && <p>{errorMsg}</p>}
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Pages</th>
                            <th>ISBN</th>
                            <th>Publication date</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            {user?.role === "Editor" &&
                                <>
                                    <th></th>
                                    <th></th>
                                </>
                            }
                            {user && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.averageRating}</td>
                                <td>{book.pageCount}</td>
                                <td>{book.isbn}</td>
                                <td>{new Date(book.publishedDate).toLocaleDateString('en-US')}</td>
                                <td>{book.authorFullName}</td>
                                <td>{book.publisherName}</td>
                                {user?.role === "Editor" &&
                                    <>
                                        <td><button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button></td>
                                        <td><button className="edit-btn" onClick={() => { navigate(`/update-book/${book.id}`) }}>Edit</button></td>
                                    </>
                                }
                                {user && <td><button onClick={() => setSelectedBook(book)}>Add Review</button></td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedBook && (
                    <AddReviewModal
                        book={selectedBook}
                        onClose={() => setSelectedBook(null)}
                        onSave={handleSaveReview}
                    />
                )}
            </div>
        </div>
    )
}

export default Books;