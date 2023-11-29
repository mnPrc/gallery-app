import React from 'react';
import { isAuthenticated, userSelector } from '../../store/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/gallery/slice';
import AddComment from './AddComment';
function DisplayComments({ gallery }) {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const activeUser = useSelector(userSelector);
    const dispatch = useDispatch();

  return (
    <div>
        {gallery && (
            <div>
                <h3>Comments:</h3>
                {gallery.comments?.length ? (
                    <div>
                        {gallery.comments.map((comment) => (
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
                                {isUserAuthenticated && activeUser.id === comment.user_id && (
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