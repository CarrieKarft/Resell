import React, {useState} from "react";

function UpdateProduct({prod, onHandleUpdateProduct, setSelected}) {
    const [description, setDescription] = useState(prod.description)
    const [image, setImage] = useState()
    const [productName, setProductName] = useState(prod.product_name)

    const {id} = prod

    function handleFormSubmit(e) {
        e.preventDefault()
        const data = new FormData();

        data.append("description", description);
        data.append("image", image)
        data.append("product_name", productName)

        if(!image) return alert("There needs to be an image file attached")
        onHandleUpdateProduct(data, id)
        setSelected(false)

    }
    return (
        <div className="comment">
            <div >
            <form onSubmit={e => handleFormSubmit(e)}>
                <label>Product Name:
                    <input
                    type='text'
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    ></input>
                </label>
                <br/>
                <label> Description:
                    <input
                    type='text'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                </label>
                <br/>
                <label>Image:
                    <input
                    type='file'
                    onChange={e => setImage(e.target.files[0])}
                    ></input>
                </label>
                <br/>
                <input type='submit'></input>
            </form>
            </div>
        </div>
    )
}

export default UpdateProduct;