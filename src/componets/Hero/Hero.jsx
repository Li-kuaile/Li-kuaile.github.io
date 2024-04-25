import React from 'react'
import { getImageurl } from '../../utils'
import styles from './Hero.module.css'
export const Hero = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi~,  我是李快乐</h1>
                <p className={styles.description}>
                    目前研二在读，正在找前端实习。欢迎访问我的小空间，了解我的学习日常~
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
