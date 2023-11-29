import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectCreateGalleryErrors } from '../../store/gallery/selector';
import { createGallery, setCreateGalleryErrors } from '../../store/gallery/slice';
import CreateGalleryErrors from '../../components/errors/CreateGalleryErrors';

function CreateGallery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(selectCreateGalleryErrors);

  const [newGallery, setNewGallery] = useState({
    name: '',
    description: ''
  });
  
  const [newImages, setNewImages] = useState([
    {
      imageUrl: '',
    },    
  ]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(createGallery({...newGallery, images: newImages}));
    dispatch(setCreateGalleryErrors());
    history.push('/galleries');
    
  }

  const handleInputChange = (e, index) => {
    const list = [...newImages];
    list[index][e.target.name] = e.target.value;
    
    setNewImages(list);
  }

  const handleRemoveButton = (index) => {
    const list = [...newImages];
    list.splice(index, 1);

    setNewImages(list);
  }

  const handleAddButton = () => {
    setNewImages([...newImages, {imageUrl: ''}]);
  }
  
  return (
    <div>
      <h2>Create New Gallery</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type='text'
          placeholder='Gallery Name'
          value={newGallery.name}
          onChange={({ target }) => setNewGallery({...newGallery, name: target.value})}
        />
        <br/>
        <textarea
          placeholder='Description'
          value={newGallery.description}
          onChange={({ target })=> setNewGallery({...newGallery, description: target.value})}
        />
        {newImages && 
          newImages.map((x,i) => {
            return (
              <div key={i}> 
                <input
                  required
                  name='imageUrl'
                  value={x.imageUrl}
                  placeholder='Image url'
                  onChange={(e) => handleInputChange(e,i)}
                  key={i}
                />
                <span>
                  {newImages?.length !== 1 && (
                    <button onClick={() => handleRemoveButton(i)}>
                      Remove
                    </button>
                  )}
                </span>
                <div>
                  {newImages?.length - 1 === i && (
                    <button onClick={handleAddButton}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })
        }
        <button type="submit">Add Gallery</button>
      </form>
      {errors && <CreateGalleryErrors error={errors} />}
    </div>
  )
}

export default CreateGallery