import React, { useEffect, useState } from "react";
import { authService, updateProfile, collection, dbService, getDocs, query, where, orderBy } from "fBase";
import { useHistory } from "react-router";

const Profile = ({ userObj, refreshUser }) => {
    
    const history = useHistory();
    const onLogOutClick = () => { 
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
            refreshUser();
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                  type="text" 
                  placeholder="Display name" 
                  onChange={onChange} 
                  value={newDisplayName} 
                  autoFocus
                  className="formInput"
                />
                <input
                  type="submit"
                  value="Update Profile"
                  className="formBtn"
                  style={{
                      marginTop: 10,
                  }} 
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
}
export default Profile;