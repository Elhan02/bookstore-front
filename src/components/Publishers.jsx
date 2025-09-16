import React, { useEffect, useState } from "react";
import { getAllPublishers } from "../services/PublishersService";
import Spinner from "./Spinner";

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    async function loadPublishers() {
        try {
            setLoading(true);
            const data = await getAllPublishers();
            setPublishers(data);
        } catch (error) {
            if (error.status && error.status === 500) {
                setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while fetching Publishers:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadPublishers();

        return (
            console.log('Publishers unmounted')
        );
    }, []);

    
    return (
        <div className="publishers">
            <h1>Publishers page</h1>
            {loading && <Spinner />}
            {errorMsg && <p>{errorMsg}</p>}
            <table className="publishers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map(publisher => (
                        <tr key={publisher.id}>
                            <td>{publisher.name}</td>
                            <td>{publisher.address}</td>
                            <td>{publisher.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Publishers;