import React from 'react'

function DisplayImages({ images }) {
  return (
    <div>
        <ul>
            {images && images.length ? images.map((image, index) => (
                <li key={image.id}>
                    <a key={index} target='_blank' href={image.imageUrl}>
                        <img
                            key={image.id}
                            src={image.imageUrl}
                            alt={'Image'}
                        />
                    </a>
                </li>
            )) : 'No images'}
        </ul>
    </div>
  );
}

export default DisplayImages