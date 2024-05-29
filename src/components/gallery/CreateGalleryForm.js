import React from "react";

function CreateGalleryForm({ 
    id, 
    newGallery, 
    setNewGallery,
    newImages, 
    handleCancel,  
    handleSubmit, 
    handleInputChange, 
    handleRemoveButton, 
    handleAddButton, 
    changeOrder 
}) {
    return (
        <form className="create-gallery-form" onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Gallery Name"
                value={newGallery.name}
                onChange={({ target }) =>
                    setNewGallery({ ...newGallery, name: target.value })
                }
            />
            <br />
            <textarea
                placeholder="Description"
                value={newGallery.description}
                onChange={({ target }) =>
                    setNewGallery({
                        ...newGallery,
                        description: target.value,
                    })
                }
            />
            <br />
            <input
                required
                type="number"
                min="1"
                max="10000"
                placeholder="Gallery Price"
                value={newGallery.price}
                onChange={({ target }) =>
                    setNewGallery({
                        ...newGallery,
                        price: parseFloat(target.value),
                    })
                }
            />

            {newImages &&
                newImages.map((x, i) => (
                    <div key={i}>
                        <input
                            required
                            name="imageUrl"
                            value={x.imageUrl}
                            placeholder="Image url"
                            onChange={(e) => handleInputChange(e, i)}
                            key={i}
                        />
                        {newImages.length > 1 && (
                            <div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        changeOrder(i, "UP")
                                    }
                                >
                                    Move Up
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        changeOrder(i, "DOWN")
                                    }
                                >
                                    Move Down
                                </button>
                            </div>
                        )}
                        <span>
                            {newImages?.length !== 1 && (
                                <button
                                    onClick={() =>
                                        handleRemoveButton(i)
                                    }
                                >
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
                ))}

            <span className="mb-2">
                <button type="submit">
                    {id ? "Update" : "Create Gallery"}
                </button>
            </span>
            <div>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default CreateGalleryForm;