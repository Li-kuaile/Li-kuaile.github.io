import React from 'react'
import styles from './Learn.module.css'
import { getImageurl } from "../../utils"
import learn from '../../data/learn.json'
import { Link } from "react-router-dom";

export const Learn = () => {
    return (
        <section className={styles.container} id='blog'>
            <h2 className={styles.title}>学习路线</h2>
            <div className={styles.content}>
                {
                    learn.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.subtitle}>
                                <h3>{item.title}</h3>
                                <Link to="/blog">
                                    <img src={getImageurl('learn/herf.png')} alt={'learn link'} />
                                </Link>
                                {/* <a href="#blog">
                                    <img src={getImageurl('learn/herf.png')} alt={'learn link'} />
                                </a> */}
                            </div>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
