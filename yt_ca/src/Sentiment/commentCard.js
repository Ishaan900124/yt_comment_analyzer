import React from 'react';

const CommentCard = ({user, comment, sentiment}) => {
  return (
    <table className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <tc className="m-0 font-weight-bold" style={{'color':'red'}}>{user}</tc>
        <tc className="m-0 font-weight-bold" style={{width:"50%",'color':'black','text-align':'left'}}>{comment}<button style={{width:"100px", left:"50%", backgroundColor:"green", borderColor:"green", borderRadius:"5px", color:"white", display:"block", height:"30px", verticalAlign:'right'}}>translate</button></tc>
        <tc className="m-0 font-weight-bold" style={{'color':'blue','border-radius':'5px'}}>{sentiment}</tc>
    </table>
  )
}

export default CommentCard