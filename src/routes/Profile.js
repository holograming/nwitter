import React from "react";
import { authService } from "fBase";
import { useHistory } from "react-router";

const Profile = () => {
    const history = useHistory();
    const onLogoutClick = () => { 
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    );
}
export default Profile;