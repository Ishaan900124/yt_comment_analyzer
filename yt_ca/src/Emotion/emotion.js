import React from 'react'
import Card from '../card'

const Emotion = () => {
    return (
    <div className="container-fluid">
        <h1 style={{textAlign: 'center'}}>Emotional Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}}>Analyze</button>
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
                        <h6 className="m-0 font-weight-bold text-primary">Comments</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Emotion