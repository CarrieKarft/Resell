import React, {useState} from "react";

function NewProductForm({onHandleCreateProduct}) {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [productName, setProductName] = useState('')
    function handleFormSubmit(e) {
        e.preventDefault()
        const data = new FormData();
        data.append("description", description);
        data.append("image", image)
        data.append("product_name", productName)

        onHandleCreateProduct(data)
    }

    return (
        <div>
            <h1>File Form</h1>
            <form onSubmit={e => handleFormSubmit(e)}>
                {/* <label htmlFor="description"> Description</label>
                <input type='text' name='description' id='description'></input>
                <br />

                <label htmlFor="minimum_price">Minimum Price</label>
                <input type='text' name="minimum_price" id='minimum_price'></input>
                <br />

                <label htmlFor="image">Product Image</label>
                <input type='file' name="image" id='image'></input>
                <br /> */}
                <label>Product Name
                    <input
                    type='text'
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    ></input>
                </label>
                <br/>
                <label> Descripition
                    <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                </label>
                <br />
                <label>Image
                    <input
                    type='file'
                    // value={image}
                    onChange={e => setImage(e.target.files[0])}
                    ></input>
                </label>
                <br />
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default NewProductForm;


// t.string "description"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// t.string "product_name"
