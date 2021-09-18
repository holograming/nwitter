import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { collection, dbService, onSnapshot } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    /// load nweets
    const [nweets, setNweets] = useState([]);
    useEffect(()=> {
        // snapshot : to prevent re-render 
     onSnapshot(collection(dbService, "nweets"), snapshot => {
         const nweetArrary = snapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()}
         ));
         setNweets(nweetArrary);
     });
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                <h4>{nweets.map((nweet)=> (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}</h4>
            </div>
        </div>
    );
}
export default Home;