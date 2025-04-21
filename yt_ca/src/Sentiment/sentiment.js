import React, { useState } from 'react'
import Carde from '../carde'
import CommentCard from './commentCard'

const Sentiment = ({comments, comment}) => {
    const [data, setData] = useState([]);
    const positive = 0;
    const negative = 0;
    const neutral = 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/sentiment",
                {
                    method: "POST",
                    body: JSON.stringify(comments),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = Array.from(await response.json());
            console.log(responseData);
            setData(responseData);
        } 
        catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };
    return (
    <div className="container-fluid">
        <h1 style={{textAlign: 'center'}}>Sentiment Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Analyze</button>
        <div className="row">
            <Carde title="positive" entry="0" type="fa-solid fa-face-smile fa-2x text-success"/>
            <Carde title="neutral" entry="0" type="fa-solid fa-face-meh fa-2x text-warning"/>
            <Carde title="negative" entry="0" type="fa-solid fa-face-angry fa-2x text-danger"/>
        </div>
        <div className="row">
            <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"20%"}}>User</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"60%"}}>Comment</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"20%", textAlign:"center"}}>Sentiment</h6>
                    </div>
                    {data.map((c, idx)=>
                        (
                            <CommentCard user={c.username} comment={c.comment} sentiment={c.sentiment} />
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Sentiment