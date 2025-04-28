import React, { useState } from 'react'
import { useScroll } from '../Hook/useScroll'
import UserSign from './UserSign';
import { Link } from 'react-router-dom';
import SearchList from './SearchList';
import { useGetProductsQuery } from '../Redux/RTK/Products';
import HeaderSkeleton from './Skeleton/HeaderSkeleton';

const Header = () => {
    const [ ad, setAd ] = useState(true);
    const [ searchText, setSearchText ] = useState('');
    const [ { scrollY } ] = useScroll();
    const [ search, setSearch ] = useState(false);
    const { data: allProducts, isLoading } = useGetProductsQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    const blurSearch = () => {
        setTimeout(() => {
            setSearch(false);
        }, 700);
    };

    if(isLoading) return <HeaderSkeleton />
    
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
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            onFocus={() => setSearch(true)}
                            onBlur={blurSearch}
                        />
                        <img
                            src='/icons/white-close.svg'
                            alt='search-icon'
                            className='img w-[20px] cursor-pointer'
                            onClick={() => setSearchText('')}
                        />
                    </div>
                    {
                        search && <SearchList searchText={searchText} data={allProducts?.data} />
                    }
                </div>
                <UserSign />
            </div>
        </header>
    )
}

export default Header