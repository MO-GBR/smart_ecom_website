import React from 'react'
import Button from './Button';

const SearchList = ({ data, searchText }) => {
    const SearchData = data.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(searchText.toString().toLocaleLowerCase())
        );
    });
    return (
        <div className='searchList'>
            {
                searchText === '' ? (
                    <p className='font-bold my-5'>Type anything...</p>
                ) : (
                    SearchData.map((item) => (
                        <Button title={item.title} href={`/product/${item._id}`} key={item._id} />
                    ))
                )
            }
        </div>
    )
}

export default SearchList