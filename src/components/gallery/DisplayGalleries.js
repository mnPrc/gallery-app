import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGalleries } from '../../store/gallery/selector';
import { getGalleries } from '../../store/gallery/slice';
import GalleryRow  from './GalleryRow';

function DisplayGalleries() {
    const dispatch = useDispatch();
    const galleries = useSelector(selectGalleries);

    useEffect(() => {
        dispatch(getGalleries({ page: 1}));
    }, []);

    function handlePaginate(page) {
        dispatch(getGalleries({ page: page}));
    }
    return (
    <div>
        <div>
            {galleries.data.length ? (
                <div>
                    <ul>
                        {galleries.data.map((gallery) =>(
                            <GalleryRow key={gallery.id} gallery={gallery}/>
                        ))}
                    </ul>
                    {galleries.current_page !== galleries.last_page && (
                        <button onClick={() => handlePaginate(galleries.current_page + 1)}>
                            Load More
                        </button>
                    )}
                </div>
            ) : (
                <div>There are no galleries</div>
            )}
        </div>
    </div>
  )
}

export default DisplayGalleries