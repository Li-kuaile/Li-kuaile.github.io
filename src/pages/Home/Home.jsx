import React,{useEffect} from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
    const [leftClass, setLeftClass] = React.useState(false)
    const [rightClass, setRightClass] = React.useState(false)
    return (
        <div className={styles.homeBody}>
            <div className={`${styles.container} ${leftClass?styles.hoverLeft:''} ${rightClass?styles.hoverRight:''}`}>
                <div className={`${styles.split} ${styles.left}`} onMouseEnter={()=>setLeftClass(true)} onMouseLeave={()=>setLeftClass(false)}>
                    <div className={styles.bg}></div>
                    <h1 className={styles.title}>个人简历</h1>
                    <Link to="/resume" className={styles.btn}>Learn More</Link>
                </div>
                
                <div className={`${styles.split} ${styles.right}`} onMouseEnter={()=>setRightClass(true)} onMouseLeave={()=>setRightClass(false)}>
                    <div className={styles.bg}></div>
                    <h1 className={styles.title}>个人博客</h1>
                    <Link to="/blog" className={styles.btn}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}
