import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlist } from "../../store/gallery/selector";
import { deleteGalleryFromWishlist, getWishlist } from "../../store/gallery/slice";
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Wishlist(){
    const dispatch = useDispatch();
    const wishlists = useSelector(selectWishlist);
    const history = useHistory();

    useEffect(() => {
        dispatch(getWishlist());
    },[]);

    const handleRemoveGalleryFromWishlist = (id) => {
        dispatch(deleteGalleryFromWishlist(id));
        history.push('/');
        dispatch(getWishlist());
    };
    
    return(
        <div>
            {wishlists.length ? <h1>Wishlist</h1> : <h1>Wishlist is empty</h1>}
                {wishlists && wishlists?.map((wishlist) =>{
                    return (<ul key={wishlist.id}>
                        <div className="justify-content-sm-evenly gallery-row-margin">
                            <Link to={`/galleries/${wishlist.gallery?.id}`}>
                                <h3>{wishlist.gallery.name}</h3>
                            </Link>
                            <p>{wishlist.gallery.description}</p>
                            <p>Gallery Price: {wishlist.gallery.price}</p>
                            <img src={wishlist.gallery.first_image_url} width="300px" height="300px"></img>
                        </div>
                        {wishlist.gallery.buyer_id !== null ? (
                            <div className="justify-content-sm-evenly gallery-row-margin">
                                <p className="text-danger">You own this gallery, you can remove it from the Wishlist</p>
                            </div>
                        ):(
                            <></>
                        )}
                        <div className="d-lg-flex justify-content-center mt-4 mb-4">
                            <button onClick={() => handleRemoveGalleryFromWishlist(wishlist.id)}>
                                Remove gallery from your wishlist
                            </button>
                        </div>
                    </ul>)
                })}
        </div>
    )
}

export default Wishlist;