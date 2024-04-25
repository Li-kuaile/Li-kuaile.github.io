import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { getImageurl } from "../../utils"
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navRef = React.createRef();
    const [is_fixed, set_is_fixed] = useState(false);
    const [navBackground, setNavBackground] = useState(''); // 初始背景色为透明

    // 导航栏的背景色随着页面滚动而变化，颜色由透明到白色，再到透明，实现了渐变效果。
    useEffect(() => {
        const fixedTop = navRef.current.offsetTop;
        // console.log(fixedTop);
        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop;
            
            const isFixed = scrollTop >= fixedTop;
            set_is_fixed(isFixed);
        }

        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        };
    }, []);
    const listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = 6 * winScroll / height;
        setNavBackground(`rgba(195, 236, 252, ${scrolled})`);
    };
    const handleMenuClick = (event) => {
        event.preventDefault(); // 阻止默认跳转行为
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`${styles.navbar} ${is_fixed ? styles.fixedTop : ''} `} style={{ backgroundColor: navBackground }} ref={navRef}>
            <a href="/" className={styles.title}>lwx的小空间</a>
            {/* menu toggle */}
            <div className={styles.menu}>
                <a
                    className={`${styles.menubtn} ${menuOpen && styles.isclicked}`}
                    href="#"
                    onClick={handleMenuClick}
                >
                    <span>Menu</span>
                </a>
                <ul className={`${styles.menuitem} ${menuOpen && styles.menuOpen}`}>
                    <li>
                        <a href="#about">教育经历</a>
                    </li>
                    <li>
                        <a href="#experience">技术能力</a>
                    </li>
                    <li>
                        <a href="#blog">学习路线</a>
                    </li>
                    <li>
                        <a href="#projects">项目经历</a>
                    </li>
                    <li>
                        <a href="#contact">联系我</a>
                        {/* <Link to="/blog">blog</Link> */}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
