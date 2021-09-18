import { dbService, doc, deleteDoc, updateDoc, storageService, ref, deleteObject } from "fBase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet??");
        if(ok) {
          if(nweetObj.attachmentUrl!=="") {
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
          }
          await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
            text:newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: {value},   
        } = event;
        setNewNweet(value);
    };

    return (
        <div>
          {editing? (
            <>
              <form onSubmit={onSubmit}>
                  <input 
                    type="text"
                    placeholder="Edit your nweet"
                    value={newNweet}
                    onChange={onChange}
                    required />
                  <button>Update Nweet</button>
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
            ) : ( 
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
            {isOwner && (
                <>
                  <button onClick={toggleEditing}>Edit Nweet</button>
                  <button onClick={onDeleteClick}>Delete Nweet</button>
                </>
              )}
            </>
          )}
        </div>   
    );

};

export default Nweet;