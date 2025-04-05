import React from 'react';

const CommentCard = ({user, comment, sentiment}) => {
  return (
    <table className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <tc className="m-0 font-weight-bold">{user}</tc>
        <tc className="m-0 font-weight-bold" style={{width:"60%"}}>{comment}</tc>
        <tc className="m-0 font-weight-bold" style={{'background-color':'green','color':'white','border-radius':'5px'}}>{sentiment}</tc>
    </table>
  )
}

export default CommentCard