import React, { useState, useEffect } from 'react'
import { getImageurl } from '../../utils'
import styles from './Totop.module.css'
export const Totop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className={styles.top}>
            {showButton && (
                <button type='button' onClick={handleClick}>
                    <img src={getImageurl("top/top.png")} alt="top img" className={styles.topImg}/>
                </button>
            )}
        </div>
    );
}
