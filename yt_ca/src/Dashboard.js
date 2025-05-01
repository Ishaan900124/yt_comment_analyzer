import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './sidebar';
import Sentiment from './Sentiment/sentiment';
import Toxicity from './Toxicity/toxicity';
import Emotion from './Emotion/emotion';
import Frontpage from './Frontpage';
import Summarization from './Summarization/summarization';

function Dashboard() {
    const [field, setField] = useState(0);
    const [fucUrl, setUrl] = useState("");
    const [fetching, setFetching] = useState(false);
    const [Comment, setComment] = useState(false);
    const [comments, setComments] = useState({});
    const f1 = (e) => {
        e.preventDefault();
        setField(1);
    }
    const f2 = (e) => {
        e.preventDefault();
        setField(2);
    }
    const f3 = (e) => {
        e.preventDefault();
        setField(3);
    }
    const f4 = (e) => {
        e.preventDefault();
        setField(4);
    }
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    const changeStyle1 = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = fucUrl;
        setUrl("");
        setFetching(true);
        let p = url.split("=");
        let final = p[1].split("&");
        console.log(final[0]);
        const Url = {
            videoId: final[0],
        };
        try {
            const response = await fetch(
                "http://localhost:5000/get_comments",
                {
                    method: "POST",
                    body: JSON.stringify(Url),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await response.json();
            setComments(responseData);
            setComment(true);
            setFetching(false);
            console.log(responseData)
        } 
        catch (error) {
            setFetching(false);
            console.error("There was a problem with your fetch operation:", error);
        }
    };
    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar func1={f1} func2={f2} func3={f3} func4={f4}/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={changeStyle1}>
                                <i className="fa fa-bars"></i>
                                </button>
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                <input type="url" name="URL" id="URL" value={fucUrl} className="form-control bg-light border-0 small" placeholder="Enter YouTube video URL here..."
                                onChange={handleUrlChange}
                                required
                                aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                                        <span>Enter</span>
                                    </button>
                                </div>
                                </div>
                            </form>
                            </nav>
                            {(field===1?<Sentiment comments={comments} comment={Comment}/>:(field===2?<Emotion comments={comments} comment={Comment}/>:(field===3?<Toxicity comments={comments} comment={Comment}/>:(field===4?<Summarization comments={comments} comment={Comment}/>:<Frontpage/>))))}
                        </div>
                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </body>
        </div>
    )
}

export default Dashboard;