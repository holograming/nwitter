import { getDocs, addDoc, collection, dbService, onSnapshot } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    /// save nweets
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId:userObj.uid,
        });
        setNweet("");
    };
    
    /// load nweets
    const [nweets, setNweets] = useState([]);
    useEffect(()=> {
     onSnapshot(collection(dbService, "nweets"), snapshot => {
         const nweetArrary = snapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()}
         ));
         setNweets(nweetArrary);
     });
    }, []);
    
    console.log(userObj);

    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                <h4>{nweets.map((nweet)=> (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}</h4>
            </div>
        </div>
    );
}
export default Home;