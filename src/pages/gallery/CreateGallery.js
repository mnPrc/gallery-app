import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    createGallery,
    updateGallery,
    setResetForm,
} from "../../store/gallery/slice";
import { useParams } from "react-router-dom";
import { selectCreateGalleryErrors, selectGallery } from "../../store/gallery/selector";
import CreateGalleryErrors from "../../components/errors/CreateGalleryErrors";
import CreateGalleryForm from "../../components/gallery/CreateGalleryForm";

function CreateGallery() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const gallery = useSelector(selectGallery);
    const errors = useSelector(selectCreateGalleryErrors);


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
                    meta: {
                        onSuccess: () => {
                            history.push(`/galleries/${gallery.id}`);
                            dispatch(setResetForm());
                        },
                    },
                })
            );
        } else {
            dispatch(
                createGallery({
                    ...newGallery,
                    first_image_url: firstImageUrl,
                    price: newGallery.price,
                    images: newImages,
                    meta: {
                        onSuccess: () => {
                            history.push('/my-galleries')
                            dispatch(setResetForm());
                        },
                    },
                })
            )
        }
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
            <CreateGalleryForm
                id={id}
                newGallery={newGallery}
                setNewGallery={setNewGallery}
                newImages={newImages}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                handleInputChange={handleInputChange}
                handleRemoveButton={handleRemoveButton}
                handleAddButton={handleAddButton}
                changeOrder={changeOrder}
            />
            {errors && <CreateGalleryErrors error={errors} />}
        </div>
    );
}

export default CreateGallery;
