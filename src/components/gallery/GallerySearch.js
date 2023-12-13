import React from 'react'
import { selectSearchTerm, selectSearchUserId } from '../../store/gallery/selector'
import { useDispatch, useSelector } from 'react-redux';
import { getGalleries, setSearchTerm } from '../../store/gallery/slice';
import Button from 'react-bootstrap/Button';


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
         <input className='input-field' type="text" onChange={changeSearchTerm} placeholder="Input search term here" />
         <br/>
         <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default GallerySearch