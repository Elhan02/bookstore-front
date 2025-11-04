import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/UserService.js";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    async function loadProfile() {
        const data = await getUserProfile();
        setProfile(data);
    }
    useEffect(() => {
        loadProfile();
    }, [])

    return (
        <div style={{display:"flex",flexDirection:"column", alignItems:"center", height:"100%", marginTop:"50px"}}>
            <img style={{ width: "300px", height: "300px", borderRadius: "50%" }} src={profile?.pictureUrl || "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740&q=80"} alt="Profile picture" />
            <h2 style={{fontSize:"30px", color:"rgb(112, 198, 226)"}}>{profile?.name} {profile?.surname}</h2>
        </div>


    )
}

export default Profile;