import React from "react";

import styles from "./About.module.css";
import { getImageurl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>教育经历</h2>
      <div className={styles.box}>
        <div className={styles.content}>
          {/* <div className={styles.imgblur}> */}
          <img
            src={getImageurl("about/aboutImage.png")}
            alt="Me"
            className={styles.aboutImage}
          />
          <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
              <img src={getImageurl("about/cursorIcon.png")} alt="Cursor icon" className={styles.aboutEdu} />
              <div className={styles.aboutItemText}>
                <div className={styles.edutitle}>
                  <h3>硕士</h3>
                  <h3>电子信息专业</h3>
                  <h3>Rank: 4/135</h3>
                  <h3>2022.9-至今</h3>
                </div>
                <ul>
                  <li>主要研究方向为图像分割</li>
                  <li>曾获优秀学生、一等奖学金(2023)，二等奖学金(2022)</li>
                </ul>
              </div>
            </li>
            <li className={styles.aboutItem}>
              <img src={getImageurl("about/cursorIcon.png")} alt="UI icon" className={styles.aboutEdu} />
              <div className={styles.aboutItemText}>
                <div className={styles.edutitle}>
                  <h3>本科</h3>
                  <h3>计算机科学与技术专业</h3>
                  <h3>Rank: 2/178</h3>
                  <h3>2018.9—2022.6</h3>
                </div>
                <ul>
                  <li>曾获一等奖学金、二等奖学金(2019-2021)</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </section>
  );
}
