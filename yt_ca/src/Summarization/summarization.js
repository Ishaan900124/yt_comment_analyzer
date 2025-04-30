import React, { useState } from 'react'

const Summarization = ({comments, comment}) => {
    const [data, setData] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        try {
            const response = await fetch(
                "http://localhost:5000/summarization",
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
            setData(responseData[0]);
        } 
        catch (error) {
            console.error("There was a problem with your fetch operation:", error);
        }
    };
    return (
    <div>
        <div className="container-fluid">
            <h1 style={{textAlign: 'center'}}>Comment Summarization</h1>
            <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Summarize</button>
            <div className="row">
                <div className="col-xl-12 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Summary of Comments</h6>
                        </div>
                        <h5 style={{marginLeft:"20px"}}>{data}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Summarization