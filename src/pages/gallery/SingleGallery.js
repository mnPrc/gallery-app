import React, { useEffect } from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { selectGallery } from '../../store/gallery/selector'; 
import { isAuthenticated, userSelector } from '../../store/auth/selectors';
import useFormattedDate from '../../hooks/useFormattedDate';
import { buyGallery, createWishlist, deleteGallery, getGallery, } from '../../store/gallery/slice';
import DisplayImages from '../../components/gallery/DisplayImages';
import DisplayComments from '../../components/gallery/DisplayComments';
import { getActiveUser } from '../../store/auth/slice';

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
      dispatch(getActiveUser(id))
    },[id, dispatch]);
    
    useEffect(() => {
        dispatch(getGallery(id))
    }, [id, dispatch]);

    const handleDeleteGallery = (gallery_id) => {
        dispatch(deleteGallery(gallery_id));
        history.push('/galleries');
    }

    const handleUpdateGallery = (id) => {
      history.push(`/update-gallery/${id}`);
    };

    const handleBuyGallery = (galleryId, buyerId) => {
      dispatch(buyGallery({ galleryId, buyerId }));
      history.push('/transactions')
    }

    function handleCreateWishlist(e) {
      e.preventDefault();
      dispatch(createWishlist(id));
      history.push('/wishlist');
  }

  return (
    <div>
      <h1>{gallery.name}</h1>
      {gallery.user && (
						<Link to={`/authors/${gallery?.user.id}`}>
								Author: {gallery?.user?.first_name} {gallery?.user?.last_name}
						</Link>
				)}
      <p>Description: <br/> {gallery.description}</p>
      <p>Created at: {formattedDate}</p>

      <div className="d-lg-flex justify-content-center mt-4 mb-4">
        {gallery.wishlists?.some(({ gallery_id }) => gallery_id === gallery.id) ?
          <p className="text-danger">This gallery is in your wishlist</p> :
            <button onClick={handleCreateWishlist}>Add to Wishlist</button>
        }
      </div>
      <p>Gallery Price: {gallery.price}</p>
      {isUserAuthenticated && gallery.buyer_id === null ? (
        <div className="d-lg-flex justify-content-center mt-4 mb-4">
            {gallery.user_id === activeUser.id ? (
                <p className="text-danger">You own this gallery</p>
            ) : (
                <button onClick={() => handleBuyGallery(gallery.id, activeUser.id)}>Buy Gallery</button>
            )}
        </div>
      ) : (
        <p className="text-danger">This gallery is already purchased</p>
      )}
      {isUserAuthenticated && activeUser.id === gallery.user_id && (
          <>
          <button onClick={() => handleUpdateGallery(id)}>Update Gallery</button>
          <><br/></>
          <button onClick={() => handleDeleteGallery(id)}>Delete Gallery</button>
          </>
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