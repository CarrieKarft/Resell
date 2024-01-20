import React, {useState} from "react";

function NewProductForm({onHandleCreateProduct}) {
    const [description, setDescription] = useState('')
    const [minPrice, setMinPrice] = useState()
    const [image, setImage] = useState()
    function handleFormSubmit(e) {
        e.preventDefault()
        // const data = new FormData();
        // data.append("product[description]", e.target.description.value);
        // data.append("product[minimum_price", e.target.minimum_price.value);
        // data.append("product[image]", e.target.image.files[0])

        // console.log(data)
        // onHandleCreateProduct(data)
        const newProdObj = {
            description: description,
            minimum_price: minPrice,
            image: image
        }
        console.log(newProdObj)
        onHandleCreateProduct(newProdObj)
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
                    value={image}
                    onChange={e => setImage(e.target.value)}
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