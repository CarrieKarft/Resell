import React, {useState} from "react";

function SearchBar({onHandleSearchCall}) {
    const [searchWord, setSearchWord] = useState('')

    function handleSearchSubmit(e) {
        e.preventDefault()
        onHandleSearchCall(searchWord)
    }
    return (
        <div>
            <form onSubmit={e => handleSearchSubmit(e)}>
                <label>Search For Products
                    <input
                    type='text'
                    vlaue={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    >
                    </input>
                </label>
                <input type='submit'></input>
            </form>

        </div>
    )
}

export default SearchBar;