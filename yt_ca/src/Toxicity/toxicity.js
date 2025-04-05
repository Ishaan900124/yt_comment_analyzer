import React from 'react'
import Card from '../card'

const Toxicity = () => {
    return (
    <div className="container-fluid">
        <h1 style={{textAlign: 'center'}}>Toxicity Analysis</h1>
        <button style={{width:"400px", left:"50%", backgroundColor:"blue", borderColor:"blue", borderRadius:"5px", color:"white", display:"block", margin:"30px auto", height:"40px"}}>Analyze</button>
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
                        <h6 className="m-0 font-weight-bold text-primary">Comments</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Toxicity