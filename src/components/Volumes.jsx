import React, { useEffect, useState } from "react";
import { searchVolumes } from "../services/VolumesService";
import Spinner from "./Spinner";
import Issues from "./Issues";
import { useNavigate } from "react-router-dom";

const Volumes = () => {
    const [volumes, setVolumes] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function loadVolumes(search) {
        try {
            setLoading(true);
            const filter = (search && search.trim !== "" ? search : "batman")
            const data = await searchVolumes(filter)
            setVolumes(data);
        } catch (error) {
            if (error.status && error.status === 500) {
                setErrorMsg("We're experiencing technical difficulties. Please try again shortly.")
            } else if (error.request) {
                setErrorMsg("The server seems to be taking too long to respond. Please try again in a moment.");
            } else {
                setErrorMsg("Something went wrong. Please try again.");
            }
            console.log("An error occurred while fetching Volumes:", error);
        }
        setLoading(false);
    }

    const handleRowClick = (id) => {
        navigate("/issues", { state: { volumeId: id } });
    };

    useEffect(() => {
        loadVolumes("");
    }, []);

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search volumes..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => loadVolumes(searchTerm)}>
                    Search
                </button>
            </div>

            <div className="table-wrapper">
                {errorMsg && <p>{errorMsg}</p>}
                {loading ? <Spinner /> :
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volumes?.map(volume => (
                                <tr key={volume.id} onClick={() => handleRowClick(volume.id)}>
                                    <td>{volume.id}</td>
                                    <td>{volume.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {selectedId && <Issues id={selectedId} />}
            </div>
        </>
    )
}

export default Volumes;