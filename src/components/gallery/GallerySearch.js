import React from 'react'
import { selectSearchTerm, selectSearchUserId } from '../../store/gallery/selector'
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries, setSearchTerm } from '../../store/gallery/slice';

function GallerySearch() {
    const term = useSelector(selectSearchTerm);
    const user_id = useSelector(selectSearchUserId);
    const dispatch = useDispatch();

    function changeSearchTerm(e){
        dispatch(setSearchTerm(e.target.value));
    }

    function handleSearch(){
        dispatch(getGalleries({page: 1, user_id: user_id, term:term }));
    }
  return (
    <div>
         <input type="text" onChange={changeSearchTerm} placeholder="Input search term here" />
         <br/>
         <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default GallerySearch