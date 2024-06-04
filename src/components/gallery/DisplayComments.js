import React, { useEffect, useState } from 'react';
import { isAdmin, isAuthenticated, userSelector } from '../../store/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, dislikeComment, getComments, likeComment } from '../../store/gallery/slice';
import AddComment from './AddComment';
function DisplayComments({ gallery }) {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const activeUser = useSelector(userSelector);
    const isUserAdmin = useSelector(isAdmin);
    const dispatch = useDispatch();

    const [sort, setSort] = useState('created_at');
    const [order, setOrder] = useState('desc');

    useEffect(() =>{
        if(gallery?.id){
            dispatch(getComments({gallery_id: gallery.id, sort, order}));
        }
    },[sort, order, dispatch, gallery?.id]);


    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    }


    const handleLikeComment = (id) => {
        dispatch(likeComment(id));
        dispatch(getComments({gallery_id: gallery.id, sort, order}));
    }

    const handleDislikeComment = (id) => {
        dispatch(dislikeComment(id));
        dispatch(getComments({gallery_id: gallery.id, sort, order}));
    }


  return (
    <div>
        {gallery && (
            <div>
                <h3>Comments:</h3>
                <div>
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sort} onChange={handleSortChange}>
                        <option value="created_at">Created At</option>
                        <option value="likes">Likes</option>
                        <option value="dislikes">Dislikes</option>
                    </select>
                    <br/>
                    <label htmlFor="order">Order:</label>
                    <select id="order" value={order} onChange={handleOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                {gallery.comments?.length ? (
                    <div>
                        {gallery.comments
                            .filter(comment => comment.approved)
                            .map((comment) => (
                            <div key={comment.id} className='login-form'>
                                {comment?.user && (
                                    <div>
                                        <small>Comment by: </small>
                                        <div>
                                            {comment.user.first_name} {comment.user.last_name}
                                        </div>
                                    </div>
                                )}
                                <p>
                                    {' '}
                                    Created at: {''}
                                    {new Date(comment.created_at)
                                        .toISOString()
                                        .slice(0, 19)
                                        .replace('T',' ')}
                                </p>
                                <strong>
                                    <p>{comment.body}</p>
                                </strong>
                                <button onClick={() => handleLikeComment(comment.id)}>👍</button>
                                <strong><p>{comment.likes}</p></strong>
                                <button onClick={() => handleDislikeComment(comment.id)}>👎</button>
                                <strong><p>{comment.dislikes}</p></strong>
                                {isUserAuthenticated && (activeUser.id === comment.user_id || isUserAdmin) && (
                                    <button
                                        onClick={() => dispatch(deleteComment({comment: comment.id , gallery: gallery.id,}))}
                                    >
                                        Delete comment
                                    </button>
                                )}
                            </div>
                        ))}
                        <hr/>
                    </div>
                ) : (
                    <p>No comments</p>
                )}
            </div>
        )}

        {isUserAuthenticated && <AddComment gallery_id={gallery.id}/>}
    </div>
  )
}

export default DisplayComments