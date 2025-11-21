import React, { useEffect, useState } from "react";
import { addIssueToStore, getIssuesByVolumeId } from "../services/IssuesService";
import Spinner from "./PagesElements/Spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddToStoreModal from "./AddToStoreModal";

function Issues() {
    const location = useLocation();
    const volumeId = location.state?.volumeId;
    const [searchId, setSearchId] = useState("");
    const [issues, setIssues] = useState([]);
    const [idToUse, setIdToUse] = useState(volumeId);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);

    async function loadIssues(id) {
        try {
            const volumeIdSearch = (id && id != 0 ? id : 796)
            setLoading(true);
            setErrorMsg("");
            const data = await getIssuesByVolumeId(volumeIdSearch);
            setIssues(data);
        } catch (error) {
            setErrorMsg("Could not load issues.");
            console.error("Error fetching issues for id:", volumeIdSearch, error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddButtonclick = (issue) => {
        setSelectedIssue(issue);
    }

    const handleCloseModal = () => {
        setSelectedIssue(null);
    }

    const handleSaveIssue = async (issueData) => {
        await addIssueToStore(issueData);
        setSelectedIssue(null);
    }

    useEffect(() => {
        loadIssues(idToUse);
    }, [idToUse]);

    return (
        <div className="issues">
            <h1>Issues for Volume ID {idToUse}</h1>
            <div className="search-bar">
                <input
                    type="number"
                    placeholder="Search issues by volume ID..."
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />
                <button onClick={() => setIdToUse(searchId)}>
                    Search
                </button>
            </div>
            {loading && <Spinner />}
            {errorMsg && <p>{errorMsg}</p>}
            {!loading && !errorMsg && (
                <div className="issue-container">
                    {issues.map(issue => (
                        <div className="issue-card" key={issue.id}>
                            <div className="issue-image">
                                <img src={issue.image.small_url} alt="Issue" />
                            </div>
                            <div className="issue-data">
                                <p className="truncated">{issue.id} - {issue.name}</p>
                                <p>Cover date: {issue.cover_date}</p>
                                <button onClick={() => handleAddButtonclick(issue)}>Add to store</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedIssue && (
                <AddToStoreModal
                    issue={selectedIssue}
                    onClose={handleCloseModal}
                    onSave={handleSaveIssue}
                />
            )}
        </div>
    );
}

export default Issues;
