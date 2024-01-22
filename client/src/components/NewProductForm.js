import React, {useState} from "react";

function NewProductForm({onHandleCreateProduct}) {
    const [description, setDescription] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [image, setImage] = useState('')
    const [productName, setProductName] = useState('')
    function handleFormSubmit(e) {
        e.preventDefault()
        const data = new FormData();
        data.append("description", description);
        data.append("minimum_price", minPrice);
        data.append("image", image)
        data.append("product_name", productName)

        console.log(data)
        console.log(data.get("description"))
        // console.log(minPrice)
        // console.log(image)
        // onHandleCreateProduct(data)
        // const newProdObj = {
        //     description: description,
        //     minimum_price: minPrice,
        //     image: image
        // }
        // console.log(newProdObj)
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
                <label>Minimum Price
                    <input
                    type='text'
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
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
// t.float "minimum_price"