import React, { useState } from 'react'
import Card from '../card'
import CommentCard from './commentCard';

const Emotion = ({comments, comment}) => {
    const [data, setData] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/emotion",
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
        <h1 style={{textAlign: 'center'}}>Emotional Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Analyze</button>
        <div className="row">
            <Card title="joy" entry="0" type="fa-solid fa-face-laugh-beam fa-2x text-success"/>
            <Card title="sadness" entry="0" type="fa-solid fa-face-sad-tear fa-2x text-warning"/>
            <Card title="fear" entry="0" type="fa-solid fa-face-frown-open fa-2x text-secondary"/>
            <Card title="anger" entry="0" type="fa-solid fa-face-angry fa-2x text-danger"/>
            <Card title="love" entry="0" type="fa-solid fa-face-grin-hearts fa-2x text-primary"/>
            <Card title="surprise" entry="0" type="fa-solid fa-face-surprise fa-2x text-info"/>
        </div>
        <div className="row">
            <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"23%"}}>User</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"67%"}}>Comment</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"10%", textAlign:"center"}}>Emotion</h6>
                    </div>
                    {data.map((c, idx)=>
                        (
                            <CommentCard user={c.username} comment={c.comment} emotion={c.emotion} />
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Emotion