import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGallery, updateGallery, setResetForm } from '../../store/gallery/slice';
import { useParams } from 'react-router-dom';
import { selectGallery } from '../../store/gallery/selector';

function CreateGallery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const gallery = useSelector(selectGallery);

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
    if(id){
      dispatch(
        updateGallery({
          newGallery: {
            id: id,
            name: newGallery.name,
            description: newGallery.description,
            images: newImages,
          },
        })
      );
      dispatch(setResetForm());
      history.push(`/galleries/${gallery.id}`);
    }else{
    dispatch(createGallery({...newGallery, images: newImages}));
    dispatch(setResetForm());
    history.push('/my-galleries');
  }
  dispatch(setResetForm());
  };

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

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${gallery.id}`);
    } else {
      history.push("/my-galleries");
    }
  };
  
  return (
    <div>
      <h2>{id ? "Update Gallery" : "Create New Gallery"}</h2>
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
        <span className="mb-2">
          <button type="submit">{id ? "Update" : "Create Gallery"}</button>
        </span>
        <div>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateGallery