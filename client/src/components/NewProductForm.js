import React, {useState} from "react";

function NewProductForm({onHandleCreateProduct}) {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState()
    const [productName, setProductName] = useState('')
    function handleFormSubmit(e) {
        e.preventDefault()
        const data = new FormData();
        data.append("description", description);
        data.append("image", image)
        data.append("product_name", productName)

        if(!image) return alert("There needs to be an image file attached")
        onHandleCreateProduct(data)
    }

    return (
        <div className="fileForm">
            <h1>List Something</h1>
            <div className="createProduct">
            <form onSubmit={e => handleFormSubmit(e)}>
                <label>Product Name:
                    <input
                    type='text'
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    ></input>
                </label>
                <label> Description:
                    <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                </label>
                <label>Image:
                    <input
                    type='file'
                    // value={image}
                    onChange={e => setImage(e.target.files[0])}
                    ></input>
                </label>
                <input type='submit'></input>
            </form>
            </div>
        </div>
    )
}

export default NewProductForm;


// t.string "description"
// t.datetime "created_at", precision: 6, null: false
// t.datetime "updated_at", precision: 6, null: false
// t.string "product_name"
