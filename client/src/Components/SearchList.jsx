import React, { useState } from 'react'
import Button from './Button';

const SearchList = ({ data, filteredData }) => {
    const SearchData = data.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filteredData.toString().toLocaleLowerCase())
        );
    });
    return (
        <div className='searchList'>
            {
                filteredData === '' ? (
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