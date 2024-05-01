import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createGallery,
    updateGallery,
    setResetForm,
} from "../../store/gallery/slice";
import { useParams } from "react-router-dom";
import { selectGallery } from "../../store/gallery/selector";

function CreateGallery() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);

    const [newGallery, setNewGallery] = useState({
        name: "",
        description: "",
        first_image_url: "",
        price: "",
    });

    const [newImages, setNewImages] = useState([
        {
            imageUrl: "",
        },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstImageUrl = newImages.length > 0 ? newImages[0].imageUrl : "";
        if (id) {
            dispatch(
                updateGallery({
                    newGallery: {
                        id: id,
                        name: newGallery.name,
                        description: newGallery.description,
                        first_image_url: firstImageUrl,
                        price: newGallery.price,
                        images: newImages,
                    },
                })
            );
            dispatch(setResetForm());
            history.push(`/galleries/${gallery.id}`);
        } else {
            dispatch(
                createGallery({
                    ...newGallery,
                    first_image_url: firstImageUrl,
                    price: newGallery.price,
                    images: newImages,
                })
            );
            dispatch(setResetForm());
            history.push("/my-galleries");
        }
        dispatch(setResetForm());
    };

    const handleInputChange = (e, index) => {
        const list = [...newImages];
        list[index][e.target.name] = e.target.value;

        setNewImages(list);
    };

    const handleRemoveButton = (index) => {
        const list = [...newImages];
        list.splice(index, 1);

        setNewImages(list);
    };

    const handleAddButton = () => {
        setNewImages([...newImages, { imageUrl: "" }]);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        if (id) {
            history.push(`/galleries/${gallery.id}`);
        } else {
            history.push("/my-galleries");
        }
    };

    const reorderImgUrlList = (event, originalImgUrlList) => {
        const movedImgUrl = originalImgUrlList.find(
            (item, index) => index === event.oldIndex
        );

        const remainingImgUrls = originalImgUrlList.filter(
            (item, index) => index !== event.oldIndex
        );

        const reorderedItems = [
            ...remainingImgUrls.slice(0, event.newIndex),
            movedImgUrl,
            ...remainingImgUrls.slice(event.newIndex),
        ];

        return reorderedItems;
    };

    function changeOrder(index, position) {
        setNewImages(
            reorderImgUrlList(
                {
                    oldIndex: index,
                    newIndex: index + (position === "UP" ? -1 : 1),
                },
                newImages
            )
        );
    }

    return (
        <div>
            <h2>{id ? "Update Gallery" : "Create New Gallery"}</h2>
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
                    newImages.map((x, i) => {
                        return (
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
                                            onClick={() => changeOrder(i, "UP")}
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
                        );
                    })}

                <span className="mb-2">
                    <button type="submit">
                        {id ? "Update" : "Create Gallery"}
                    </button>
                </span>
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateGallery;
