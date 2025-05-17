import React, { useState } from 'react'
import Carde from '../carde'
import CommentCard from './commentCard'

const Sentiment = ({comments, comment, sendata, setSendata, sen, setSen}) => {
    const positive = sendata.filter(d => d.sentiment === 'positive').length;
    const negative = sendata.filter(d => d.sentiment === 'negative').length;
    const neutral = sendata.filter(d => d.sentiment === 'neutral').length;
    const [fetching, setFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        setFetching(true);
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
            setSendata(responseData);
            setFetching(false);
            setSen(true);
        } 
        catch (error) {
            setFetching(false);
            console.error("There was a problem with your fetch operation:", error);
        }
    };
    return (
    <div className="container-fluid">
        <h1 style={{textAlign: 'center'}}>Sentiment Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Analyze</button>
        <div className="row">
            <Carde title="positive" entry={positive} type="fa-solid fa-face-smile fa-2x text-success"/>
            <Carde title="neutral" entry={neutral} type="fa-solid fa-face-meh fa-2x text-warning"/>
            <Carde title="negative" entry={negative} type="fa-solid fa-face-angry fa-2x text-danger"/>
        </div>
        <div className="row">
            <div className="col-xl-12 col-lg-7">
                {fetching?<h4 style={{textAlign:'center'}}>Analyzing.... Please Wait....</h4>:
                
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"23%"}}>User</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"67%"}}>Comment</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"10%", textAlign:"center"}}>Sentiment</h6>
                    </div>
                    {sendata.map((c, idx)=>
                        (
                            <CommentCard user={c.username} comment={c.comment} sentiment={c.sentiment} />
                        )
                    )}
                </div>}
            </div>
        </div>
    </div>
    )
}

export default Sentiment