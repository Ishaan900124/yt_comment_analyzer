import React, { useState } from 'react'
import Card from '../card'
import CommentCard from './commentCard';

const Toxicity = ({comments, comment}) => {
    const [data, setData] = useState([]);
    const toxic = 0;
    const severe_toxic = 0;
    const hate = 0;
    const obscene = 0;
    const insult = 0;
    const racism = 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/toxicity",
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
        <h1 style={{textAlign: 'center'}}>Toxicity Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Analyze</button>
        <div className="row">
            <Card title="toxic" entry="0"/>
            <Card title="severe toxic" entry="0"/>
            <Card title="obscene" entry="0"/>
            <Card title="hate" entry="0"/>
            <Card title="insult" entry="0"/>
            <Card title="racism" entry="0"/>
        </div>
        <div className="row">
            <div className="col-xl-12 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"20%"}}>User</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"60%"}}>Toxic Comment</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"20%", textAlign:"center"}}>Toxicity</h6>
                    </div>
                    {data.map((c, idx)=>
                        (
                            <CommentCard user={c.username} comment={c.comment} toxicity={c.toxicity} />
                        )
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Toxicity