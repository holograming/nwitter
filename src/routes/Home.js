import Nweet from "components/Nweet";
import { addDoc, collection, dbService, onSnapshot } from "fBase";
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
    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNweet(value);
    }
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
    
    const [attachment, setAttachment] = useState();
    const onFileChange = (event) => {
        console.log(event.target.files);
        // 
        const {
            target:{ files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        //add listen event to fileload
        reader.onloadend = (finishedEvent) => {
            const {
               currentTarget : {result},
            } = finishedEvent;
            // finish loading event
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                <h4>{nweets.map((nweet)=> (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}</h4>
            </div>
        </div>
    );
}
export default Home;