import React from 'react'

function CreateCommentErrors({ error }) {
    return (
    <div className='text-danger'>
        <p>{error && `${error}`}</p>
    </div>
  );
}

export default CreateCommentErrors