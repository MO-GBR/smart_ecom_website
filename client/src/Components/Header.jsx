import React, { useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import UserSign from './UserSign';
import { Link } from 'react-router-dom';
import { useFetch } from '../Hook/useFetch';
import SearchList from './SearchList';
import SHeader from './Skeleton/SHeader';

const Header = () => {
    const [ ad, setAd ] = useState(true);
    const [ filteredData, setFilteredData ] = useState('');
    const [ { scrollY } ] = useScroll();
    const [search, setSearch] = useState(false);
    const [ data ] = useFetch('product/');

    const blurSearch = () => {
        setTimeout(() => {
            setSearch(false);
        }, 700);
    };

    if(data === null) return <SHeader />
    
    return (
        <header className={`header transition-all duration-300 flex-col ${scrollY > 120 ? 'header-scroll' : ''}`}>
            {
                ad && (
                    <div className={`flexCenter Announcement ${scrollY > 120 ? 'rounded-t-3xl' : ''}`}>
                        <p className='text-white font-bold mr-10 max-md:text-center'>
                            Super Deal!
                            <br className='hidden max-md:block'/>
                            Free Shipping on Orders Over $50
                        </p>
                        <img
                            src='/icons/white-close.svg'
                            alt='search-icon'
                            className='img w-[20px] cursor-pointer'
                            onClick={() => setAd(false)}
                        />
                    </div>
                )
            }
            <div className='flexAround max-md:flex-col'>
                <Link to='/'>
                    <div className='logo'>SMART</div>
                </Link>
                <div>
                    <div className='searchContainer'>
                        <img
                            src='/icons/search-white.svg'
                            alt='search-icon'
                            className='img w-[30px]'
                        />
                        <input
                            type='text'
                            placeholder='Search ...'
                            value={filteredData}
                            onChange={e => setFilteredData(e.target.value)}
                            onFocus={() => setSearch(true)}
                            onBlur={blurSearch}
                        />
                    </div>
                    {
                        search && <SearchList filteredData={filteredData} data={data.data} />
                    }
                </div>
                <UserSign />
            </div>
        </header>
    )
}

export default Header