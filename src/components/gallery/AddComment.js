import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, setCreateCommentError } from '../../store/gallery/slice';
import { selectCreateCommentErrors } from '../../store/gallery/selector';
import CreateCommentErrors from '../errors/CreateCommentErrors';

function AddComment({ gallery_id }) {
    const [newComment, setNewComment] = useState({body: ''});
    const dispatch = useDispatch();

    const errors = useSelector(selectCreateCommentErrors);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addComment({ comment: newComment, id: gallery_id}));
        dispatch(setCreateCommentError());
        setNewComment({ body: ''});
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit} className='form-group'>
                <label htmlFor='body' className='col-form-label col-25'>
                    Comment:
                </label>
                
                <input
                    type='body'
                    name='body'
                    value={newComment.body}
                    onChange={({ target }) => setNewComment({ body: target.value})}
                />
                <button className='my-button'>Add</button>
            </form>    
            {errors && <CreateCommentErrors error={errors}/>}       
        </div>
  );
}

export default AddComment;