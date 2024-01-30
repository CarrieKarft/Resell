import React, {useState} from "react";

function UpdateProduct({prod, onHandleUpdateProduct, setSelected}) {
    const [description, setDescription] = useState(prod.description)
    const [productName, setProductName] = useState(prod.product_name)

    const {id} = prod

    function handleFormSubmit(e) {
        e.preventDefault()
        const data = new FormData();

        data.append("description", description);
        data.append("product_name", productName)

        onHandleUpdateProduct(data, id)
        setSelected(false)

    }

    function cancleEdit() {
        setSelected(false)
        setDescription(prod.description)
        setProductName(prod.product_name)
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
                <input type='submit'></input>
            </form>
            <button onClick={() => cancleEdit()}>Cancel Edit</button>
            </div>
        </div>
    )
}

export default UpdateProduct;