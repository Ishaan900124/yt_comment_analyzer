import React from 'react'

const Carde = ({title, entry, type}) => {
    return (
    <div className="col-xl-4 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {title}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{entry}</div>
                    </div>
                    <div className="col-auto">
                        <i className={type}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Carde
