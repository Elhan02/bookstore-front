import React, { useEffect, useState } from "react";
import { getAuthorsPage } from "../services/AuthorsService";
import Spinner from "./PagesElements/Spinner";
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TableFooter } from "@mui/material";

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function loadAuthors(page) {
        try {
            setLoading(true);
            const data = await getAuthorsPage(page);
            setAuthors(data.items);
            setTotalPages(data.totalPages);
            setTotalCount(data.count);
            setHasNextPage(data.hasNextPage);
            setHasPreviousPage(data.hasPreviousPage);
        } catch (error) {
            if (error.status && error.status === 500) {
                setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while fetching Authors:", error);
        }
        setInterval(() => {
            setLoading(false);
        }, 1000);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    useEffect(() => {
        loadAuthors(page + 1);
    }, [page]);

    if(errorMsg){
        return(
            <strong className="error" style={{margin: "0 auto", fontSize: 20}}>{errorMsg}</strong>
        )
    }

    return (
        <>
            {!loading ? (<TableContainer sx={{ width: "80%", maxHeight: 500, margin: "0 auto", borderRadius: "10px", }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ maxHeight: "10%" }}>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Birth Year</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {authors.map(author => (
                            <TableRow key={author.id}>
                                <TableCell>{author.id}</TableCell>
                                <TableCell>{author.fullName}</TableCell>
                                <TableCell>{author.dateOfBirth}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} align="right">
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[]}
                                    rowsPerPage={5}
                                    count={totalCount}
                                    page={page}
                                    onPageChange={handleChangePage}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>) : <Spinner />}
        </>
    );
}

export default Authors;