import React, { useState, useEffect } from "react";
import SortDropdown from "./PagesElements/SortDropdown";
import { fetchSortedPublishers, fetchSortTypes, getAllPublishers } from "../services/PublishersService";
import Spinner from "./PagesElements/Spinner";

const SortedPublishers = () => {
    const [publishers, setPublishers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [chosenSortType, setChosenSortType] = useState('');
    const [sortTypes, setSortTypes] = useState([]);

    const loadSortTypes = async () => {
        try {
            const sortTypesFromDb = await fetchSortTypes();
            setSortTypes(sortTypesFromDb);
        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMessage("Server is temporarily unavailable. Please refresh or try again later.")
                }
            } else if (error.request) {
                setErrorMessage("The server is not responding. Please try again later.")
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
            console.log("An error occurred while fetching Sort types:", error);
        }
    };


    async function loadPublishers() {
        setIsLoading(true);
        try {
            const data = await getAllPublishers();
            setTimeout(() => {
                setPublishers(data);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            if (error.status) {
                if (error.status === 500) {
                    setErrorMessage("Server is temporarily unavailable. Please refresh or try again later.")
                }
            } else if (error.request) {
                setErrorMessage("The server is not responding. Please try again later.")
            } else {
                setErrorMessage("Something went wrong. Please try again.")
            }
            console.log("An error occurred while fetching Publishers:", error);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        loadSortTypes();
        loadPublishers();
    }, []);

    const handleSortTypeChange = (sortType) => {
        setChosenSortType(sortType);
        const getSortedPublishers = async () => {
            try {
                setIsLoading(true);
                const sortedPublishers = await fetchSortedPublishers(sortType);
                setTimeout(() => {
                    setPublishers(sortedPublishers);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error(error.message);
                setIsLoading(false);
            }
        }
        getSortedPublishers()
    }

    if (errorMessage) {
        return (
            <strong className="error" style={{ margin: "0 auto", fontSize: 20 }}>{errorMessage}</strong>
        )
    }

    return (
        <div className="sorted-publisher" style={{flex: 1}}>
            <div className="sort-dropdown-container" style={{margin:"50px 10% 10%", width:"20%"}}>
                <SortDropdown sortType={chosenSortType} onSelect={handleSortTypeChange} sortTypes={sortTypes} />
            </div>
            <div className="table-container sorted">
                {isLoading ? <Spinner /> :
                    <table className="publishers-table" style={{width: "80%", borderRadius: "10px"}}>
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
                    </table>}
            </div>
        </div>
    )
}
export default SortedPublishers;