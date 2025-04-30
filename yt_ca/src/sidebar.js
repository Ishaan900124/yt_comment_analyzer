import React, { useState } from 'react';

const Sidebar = ({func1, func2, func3, func4}) => {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    
    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    return (
        <ul className={style} id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Comment Cortex</div>
                    <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div>
            </a>
            <hr className="sidebar-divider my-0"/>
                <li className="nav-item" >
                    <a className="nav-link collapsed">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span onClick={func1}>Sentiment Analysis</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span onClick={func2}>Emotional Analysis</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span onClick={func3}>Toxicity Analysis</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span onClick={func4}>Comments Summarization</span>
                    </a>
                </li>
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    )
}

export default Sidebar