import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { selectGallery } from '../../store/gallery/selector'; 
import { isAuthenticated, userSelector } from '../../store/auth/selectors';
import useFormattedDate from '../../hooks/useFormattedDate';
import { deleteGallery, getGallery, } from '../../store/gallery/slice';
import DisplayImages from '../../components/gallery/DisplayImages';
import DisplayComments from '../../components/gallery/DisplayComments';

function SingleGallery() {
    const history = useHistory();
    const dispatch = useDispatch();
    const gallery = useSelector(selectGallery);
    const { id } = useParams();
    const isUserAuthenticated = useSelector(isAuthenticated)
    const activeUser = useSelector(userSelector);

    const formattedDate = useFormattedDate(
        gallery ? gallery.created_at : ' ',
        'dd.MM.yyyy'
    );
    
    useEffect(() => {
        dispatch(getGallery(id))
    }, [id, dispatch]);

    const handleDeleteGallery = (gallery_id) => {
        dispatch(deleteGallery(gallery_id));
        history.push('/galleries');
    }

  return (
    <div>
      <h1>{gallery.name}</h1>
      <h3>Author: {gallery?.user?.first_name} {gallery?.user?.last_name}</h3>
      <p>Description: <br/> {gallery.description}</p>
      <p>Created at: {formattedDate}</p>
      {isUserAuthenticated && activeUser.id === gallery.user_id && (
          <button onClick={() => handleDeleteGallery(id)}>Delete Gallery</button>
      )}
      <div>
        <DisplayImages key={gallery.id} images={gallery.images} />
      </div>
      <div>
        <DisplayComments gallery={gallery}/>
      </div>
    </div>
  )
}

export default SingleGallery