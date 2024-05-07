import React from 'react'
import styles from "./Contact.module.css"
import { getImageurl } from "../../utils"

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
       <li className={styles.link}>
          <img src={getImageurl("contact/wechatIcon.png")} alt="Wechat icon" />
          <span>SHARK-DORKY</span>
          <img src={getImageurl("contact/qrcode.png")} alt="" className={styles.qrcode}/>
        </li>
        <li className={styles.link}>
          <img src={getImageurl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:liwenxuan@gmail.com">liwenxuan@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img src={getImageurl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/Li-kuaile">github.com/Li-kuaile</a>
        </li>
        <li className={styles.link}>
          <img src={getImageurl("contact/csdn.png")} alt="csdn icon" />
          <a href="https://blog.csdn.net/Everglowwwwww">blog.csdn.net/Everglowwwwww</a>
        </li>
      </ul>
    </footer>
  )
}
