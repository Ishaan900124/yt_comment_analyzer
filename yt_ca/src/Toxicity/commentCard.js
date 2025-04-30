import React from 'react';

const CommentCard = ({user, comment, toxicity}) => {
  return (
    <table className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <tc className="m-0 font-weight-bold" style={{'color':'red'}}>{user}</tc>
        <tc className="m-0 font-weight-bold" style={{width:"50%",'color':'black','text-align':'left'}}>{comment}</tc>
        {toxicity.map((c, idx)=>
            (
                <tc className="m-0 font-weight-bold" style={{'color':'blue','border-radius':'5px'}}>{c}</tc>
            )
        )}
    </table>
  )
}

export default CommentCard