import { getDocs, addDoc, collection, dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
    /// save nweets
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
    /// load nweets
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach(documents => {
            /// input argument로 lambda func을 넘기는 방법임. return value [], implicit return 임.
            /// ... >> spread attribute 를 뜻함. -> 전체 배열
            const nweetObject = {
                ...documents.data(),
                id: documents.id,
            };
            setNweets((prev)=> [nweetObject, ...prev]);
        });
    };
    useEffect(()=> {
     getNweets();   
    }, []);
    console.log(nweets);
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
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}</h4>
            </div>
        </div>
    );
}
export default Home;