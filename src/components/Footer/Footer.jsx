import { useEffect, useState } from 'react'
import './Footer.css'
import { Github } from 'lucide-react';

function Footer() {

    return (
    <>
        <div className='BarcodeFooter'>
            <div className='Socials'>
                <div className='Social'>
                    <p className='Title'>SB<span>.</span> Barcode</p>
                </div>
                <div className='Social'>
                    <p>© 2025 Stepan Blaha | All rights reserved.</p>
                </div>
                <div className='Social'>
                    <p>Made by <a href="https://github.com/StepanBlaha" target='_blank'>Stepan Blaha</a></p>
                    <Github/>
                </div>
            </div>
            <div className='Navigation'>
                <div className='Nav'>
                    <p className='Title'>Sites</p>
                </div>
                <div className='Nav'>
                    <a href="/history">History</a>
                </div>
                <div className='Nav'>
                    <a href="/barcode">Barcode</a>
                </div>
            </div>
        </div>
    </>
    )
}

export default Footer
