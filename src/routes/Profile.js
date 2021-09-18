import React, { useEffect, useState } from "react";
import { authService, updateProfile, collection, dbService, getDocs, query, where, orderBy } from "fBase";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
    
    const history = useHistory();
    const onLogoutClick = () => { 
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"), 
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (event) => {
      const {
          target: {value},
      } = event;
      setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            const response = await updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            });
            console.log(response);
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    );
}
export default Profile;