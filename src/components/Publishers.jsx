import React, { useEffect, useState } from "react";
import { getAllPublishers } from "../services/PublisherService";

const Publishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    async function loadPublishers() {
        try {
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
    }

    useEffect(() => {
        loadPublishers ();

        return (
            console.log('Publishers unmounted')
        );
    }, []);
return (
    <div className="publishers">
        <h1>Publishers page</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Website</th>
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