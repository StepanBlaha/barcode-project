import { useEffect, useState } from 'react'
import './Header.css'
import { Github } from 'lucide-react';

function Header({ page, pageSrc }) {

    return (
    <>
        <div className='BarcodeHeader'>
            <div className='HeaderLogo'>
                <a href='https://www.linkedin.com/in/%C5%A1t%C4%9Bp%C3%A1n-bl%C3%A1ha-88b59b315/' target='_blank'>SB<span>.</span></a>
            </div>
            <div className='HeaderList'>
                <a href={pageSrc}>{page}</a>
            </div>
        </div>
    </>
    )
}

export default Header
