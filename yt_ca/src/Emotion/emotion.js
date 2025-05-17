import React, { useState } from 'react'
import Card from '../card'
import CommentCard from './commentCard';

const Emotion = ({comments, comment, emodata, setEmodata}) => {
    const admiration = emodata.filter(d => d.emotion === 'admiration').length;
    const amusement = emodata.filter(d => d.emotion === 'amusement').length;
    const anger = emodata.filter(d => d.emotion === 'anger').length;
    const annoyance = emodata.filter(d => d.emotion === 'annoyance').length;
    const approval = emodata.filter(d => d.emotion === 'approval').length;
    const caring = emodata.filter(d => d.emotion === 'caring').length;
    const confusion = emodata.filter(d => d.emotion === 'confusion').length;
    const curiosity = emodata.filter(d => d.emotion === 'curiosity').length;
    const desire = emodata.filter(d => d.emotion === 'desire').length;
    const disappointment = emodata.filter(d => d.emotion === 'disappointment').length;
    const disapproval = emodata.filter(d => d.emotion === 'disapproval').length;
    const disgust = emodata.filter(d => d.emotion === 'disgust').length;
    const embarrassment = emodata.filter(d => d.emotion === 'embarrassment').length;
    const excitement = emodata.filter(d => d.emotion === 'excitement').length;
    const fear = emodata.filter(d => d.emotion === 'fear').length;
    const gratitude = emodata.filter(d => d.emotion === 'gratitude').length;
    const grief = emodata.filter(d => d.emotion === 'grief').length;
    const joy = emodata.filter(d => d.emotion === 'joy').length;
    const love = emodata.filter(d => d.emotion === 'love').length;
    const nervousness = emodata.filter(d => d.emotion === 'nervousness').length;
    const optimism = emodata.filter(d => d.emotion === 'optimism').length;
    const pride = emodata.filter(d => d.emotion === 'pride').length;
    const realization = emodata.filter(d => d.emotion === 'realization').length;
    const relief = emodata.filter(d => d.emotion === 'relief').length;
    const remorse = emodata.filter(d => d.emotion === 'remorse').length;
    const sadness = emodata.filter(d => d.emotion === 'sadness').length;
    const surprise = emodata.filter(d => d.emotion === 'surprise').length;
    const [fetching, setFetching] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!comment){
            return false;
        }
        setFetching(true);
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
            setEmodata(responseData);
            setFetching(false);
        } 
        catch (error) {
            setFetching(false);
            console.error("There was a problem with your fetch operation:", error);
        }
    };
    return (
    <div className="container-fluid">
        <h1 style={{textAlign: 'center'}}>Emotional Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}} onClick={handleSubmit}>Analyze</button>
        <div className="row">
            <Card title="Admiration" entry={admiration} type="fa-solid fa-thumbs-up fa-2x text-primary" />
            <Card title="Amusement" entry={amusement} type="fa-solid fa-face-grin-squint-tears fa-2x text-warning" />
           <Card title="Anger" entry={anger} type="fa-solid fa-face-angry fa-2x text-danger" />
           <Card title="Annoyance" entry={annoyance} type="fa-solid fa-face-meh fa-2x text-muted" />
           <Card title="Approval" entry={approval} type="fa-solid fa-check-circle fa-2x text-success" />
           <Card title="Caring" entry={caring} type="fa-solid fa-hand-holding-heart fa-2x text-pink" />
           <Card title="Confusion" entry={confusion} type="fa-solid fa-circle-question fa-2x text-secondary" />
           <Card title="Curiosity" entry={curiosity} type="fa-solid fa-magnifying-glass fa-2x text-info" />
           <Card title="Desire" entry={desire} type="fa-solid fa-heart fa-2x text-danger" />
           <Card title="Disappointment" entry={disappointment} type="fa-solid fa-face-frown fa-2x text-muted" />
           <Card title="Disapproval" entry={disapproval} type="fa-solid fa-thumbs-down fa-2x text-danger" />
           <Card title="Disgust" entry={disgust} type="fa-solid fa-face-dizzy fa-2x text-success" />
           <Card title="Embarrassment" entry={embarrassment} type="fa-solid fa-face-flushed fa-2x text-warning" />
           <Card title="Excitement" entry={excitement} type="fa-solid fa-bolt fa-2x text-purple" />
           <Card title="Fear" entry={fear} type="fa-solid fa-face-frown-open fa-2x text-muted" />
           <Card title="Gratitude" entry={gratitude} type="fa-solid fa-hands-clapping fa-2x text-success" />
           <Card title="Grief" entry={grief} type="fa-solid fa-face-sad-tear fa-2x text-muted" />
           <Card title="Joy" entry={joy} type="fa-solid fa-face-laugh-beam fa-2x text-success" />
           <Card title="Love" entry={love} type="fa-solid fa-heart fa-2x text-danger" />
           <Card title="Nervousness" entry={nervousness} type="fa-solid fa-face-meh-blank fa-2x text-warning" />
           <Card title="Optimism" entry={optimism} type="fa-solid fa-sun fa-2x text-warning" />
           <Card title="Pride" entry={pride} type="fa-solid fa-star fa-2x text-primary" />
           <Card title="Realization" entry={realization} type="fa-solid fa-lightbulb fa-2x text-info" />
           <Card title="Relief" entry={relief} type="fa-solid fa-face-smile-beam fa-2x text-success" />
           <Card title="Remorse" entry={remorse} type="fa-solid fa-face-sad-cry fa-2x text-muted" />
           <Card title="Sadness" entry={sadness} type="fa-solid fa-face-frown-open fa-2x text-primary" />
           <Card title="Surprise" entry={surprise} type="fa-solid fa-face-surprise fa-2x text-warning" />
        </div>
        <div className="row">
            <div className="col-xl-12 col-lg-7">
                {fetching?<h4 style={{textAlign:'center'}}>Analyzing.... Please Wait....</h4>:
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"23%"}}>User</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"67%"}}>Comment</h6>
                        <h6 className="m-0 font-weight-bold text-primary" style={{width:"10%", textAlign:"center"}}>Emotion</h6>
                    </div>
                    {emodata.map((c, idx)=>
                        (
                            <CommentCard user={c.username} comment={c.comment} emotion={c.emotion} />
                        )
                    )}
                </div>}
            </div>
        </div>
    </div>
    )
}

export default Emotion