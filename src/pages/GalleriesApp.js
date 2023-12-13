import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGalleries, selectSearchTerm, selectSearchUserId } from '../store/gallery/selector';
import { useParams } from 'react-router-dom';
import { getGalleries, setSearchTerm, setSearchUserId } from '../store/gallery/slice';
import { getActiveUser } from '../store/auth/slice';
import GalleryRow from '../components/gallery/GalleryRow';
import GallerySearch from '../components/gallery/GallerySearch';


function GalleriesApp({my_id = null}) {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);
  const user_id = useSelector(selectSearchUserId);
  const { id } = useParams(); 

  useEffect(() => {
    dispatch(getActiveUser(id))
  },[id])
 
   useEffect(() => {
      if(my_id){
          dispatch(setSearchUserId(id));
          dispatch(getGalleries({ page: 1, user_id: my_id, term: null}));
      } 
      else if(id){
          dispatch(setSearchUserId(id));
          dispatch(getGalleries({ page: 1, user_id: id, term: null}));
      }
      else{
          dispatch(setSearchUserId(null));
          dispatch(getGalleries({ page: 1, user_id: null, term: null}));
      }
  }, [my_id, id, dispatch]);

  function handlePaginate(page) {
      if(my_id){
          dispatch(getGalleries({ page: page, user_id: my_id, term: term}));
      } 
      else if(id){
          dispatch(getGalleries({ page: page, user_id: id, term: term}));
      }else{
          dispatch(getGalleries({ page: page, user_id: null, term: term}));
      }        
  }

  function handleSearchTerm(e) {
      dispatch(setSearchTerm(e.target.value));
  }

  function handleSearch() {
      dispatch(getGalleries({ page: 1, user_id: user_id, term: term}))
  }

  return (
  <div>
      <div>
        <h1>{my_id && 'My '}{id && galleries.data.length ? (`${galleries?.data[0]?.user?.first_name}'s `) 
          : (<></>)}
          Galleries </h1>
          
          {galleries.data.length ? (
              <div>
                  <GallerySearch 
                      handleSearchTerm={handleSearchTerm}
                      handleSearch={handleSearch}
                  />
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

export default GalleriesApp;
