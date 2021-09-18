import { addDoc, collection, dbService, storageService, ref, uploadString, getDownloadURL } from "fBase";
import { v4 as uuidv4 } from 'uuid'; // from https://www.npmjs.com/package/uuid
import React, { useState } from "react";

const NweetFactory = ({userObj}) => {
    /// save nweets
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if(attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            await uploadString(attachmentRef, attachment, "data_url"); // data_url was we used 'readAsDataURL' function.
            attachmentUrl = await getDownloadURL(attachmentRef);
        }
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNweet(value);
    }
    
    const [attachment, setAttachment] = useState("");
    const onFileChange = (event) => {
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
        
        <form onSubmit={onSubmit}>
            <input 
                value={nweet} 
                onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
            />
            <input 
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <input 
                type="submit" 
                value="Nweet" 
            />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};
export default NweetFactory;

