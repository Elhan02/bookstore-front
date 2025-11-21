import React, { useEffect, useState } from "react";
import { getBookById, updateBook, createBook } from "../services/BooksService";
import { getAllPublishers } from "../services/PublishersService";
import { getAllAuthors } from "../services/AuthorsService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "./PagesElements/Spinner";

const CreateBook = () => {
    const { bookId } = useParams();
    const [ authors, setAuthors ] = useState([]);
    const [ publishers, setPublishers ] = useState([]);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        async function loadAuthorsAndPublishers(params) {
            try {
                setAuthors(await getAllAuthors());
                setPublishers(await getAllPublishers());
            } catch (error) {
                if (error.status && error.status === 500) {
                    setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
                } else if (error.request) {
                    setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
                } else {
                    setErrorMsg("Something went wrong. Please try again.");
                }
                console.log("An error occurred while fetching publishers/authors:", error);
            }
        }
        loadAuthorsAndPublishers();
    }, [])

    useEffect(() => {
        if (bookId) {
            async function getBook() {
                try {
                    const book = await getBookById(bookId);
                    reset({
                        title: book.title,
                        pageCount: book.pageCount,
                        publishedDate: book.publishedDate.split('T')[0],
                        isbn: book.isbn,
                        authorId: book.authorId,
                        publisherId: book.publisherId
                    });
                } catch (error) {
                    setErrorMsg('Failed loading book data.')
                    console.log('Error: ', error);
                }
            }
            getBook();
        }
    }, [bookId, reset])

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (bookId) {
                await updateBook(bookId, {...data, id: bookId});
            } else {
                await createBook(data);
            }
            setTimeout(() => {
                navigate('/books');
            }, 2000);
        } catch (error) {
            setErrorMsg('Failed to save book. Please try again.');
            console.log('Error: ', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };
    return (
        <div className="form-div">
            <h1>Enter book details</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label>Title:</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                </div>

                <div>
                    <label>Page count:</label>
                    <input
                        type="number" {...register('pageCount', { required: 'Page count is required', min: 10 })}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.pageCount.message}</p>}
                </div>

                <div>
                    <label>ISBN:</label>
                    <input
                        {...register('isbn', { required: 'ISBN is required', min: 10 })}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.isbn.message}</p>}
                </div>

                <div>
                    <label>Publish date:</label>
                    <input
                        type="date"
                        {...register("publishedDate", { required: "Publish date is required." })}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.publishedDate.message}</p>}
                </div>

                <div>
                    <label>Author:</label>
                    <select
                        {...register("authorId", { required: "Author is required." })}
                    >
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.fullName}
                            </option>
                        ))}
                    </select>
                    {errors.author && <p style={{ color: 'red' }}>{errors.authorId.message}</p>}
                </div>

                <div>
                    <label>Publisher:</label>
                    <select
                        {...register("publisherId", { required: "Publisher is required." })}
                    >
                        {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                    {errors.publisher && <p style={{ color: 'red' }}>{errors.publisherId.message}</p>}
                </div>

                <button type="submit">
                    {bookId ? 'Update Book' : 'Add Book'}
                </button>
                {loading && <Spinner />}
            </form>
        </div>
    )
}
export default CreateBook;