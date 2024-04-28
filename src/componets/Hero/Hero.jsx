import Reactn,{useEffect,useState} from 'react'
import { getImageurl } from '../../utils'
import styles from './Hero.module.css'
export const Hero = () => {
    const [textEl, setTextEl] = useState(null)
    let idx = 1
    function writeText() {   
        const text='目前研二在读，正在找前端实习。欢迎访问我的小空间，了解我的学习日常~'
        idx++
        if(idx > text.length) {
            idx = 1
        }  
        setTextEl(text.slice(0, idx))         
        setTimeout(writeText, 400)
    }
    
    useEffect(()=>{
        writeText()
    },[])
    
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi~,  我是李快乐</h1>
                <p className={styles.description}>
                    {textEl}
                </p>

                <a href="#about" className={styles.contactBtn}>
                 More About Me
                </a>
            </div>
            <img src={getImageurl("hero/avatar.png")} alt="avatar" className={styles.heroImg} />
            <div className={styles.topBlur} />
            <div className={styles.bottomBlur} />
        </section>
    )
}
