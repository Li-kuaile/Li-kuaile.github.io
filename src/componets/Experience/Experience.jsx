import React from "react"

import styles from "./Experience.module.css"
import skills from "../../data/skills.json"
import history from "../../data/history.json"
import { getImageurl } from "../../utils"

export const Experience = () => {
    return (
        <section className={styles.container} id="experience">
            <h2 className={styles.title}>技术能力</h2>
            <div className={styles.content}>
                <div className={styles.box}>
                    <div className={styles.skilltitle}>技术栈</div>
                    <div className={styles.skills}>
                        {/* array.map((item,index,arr)=>{
                    //item是操作的当前元素
                    //index是操作元素的下表
                    //arr是需要被操作的元素
                    //具体需要哪些参数 就传入那个
                }) */}
                        {skills["csSkills"].map((skill, id) => {
                            return (
                                <div key={id} className={styles.skill}>
                                    <div className={styles.skillImageContainer}>
                                        <img src={getImageurl(skill.imageSrc)} alt='csIcon' />
                                    </div>
                                    <p>{skill.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.skilltitle}>外语能力</div>
                    <div className={styles.skills}>
                        {skills["languageSkills"].map((skill, id) => {
                            return (
                                <div key={id} className={styles.skill}>
                                    <div className={styles.skillImageContainer}>
                                        <img src={getImageurl(skill.imageSrc)} alt='languageIcon' />
                                    </div>
                                    <p>{skill.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* <ul className={styles.history}>
                    {history.map((historyItem, id) => {
                        return (
                            <li key={id} className={styles.historyItem}>
                                <img
                                    src={getImageurl(historyItem.imageSrc)}
                                    alt={`${historyItem.organisation} Logo`}
                                />
                                <div className={styles.historyItemDetails}>
                                    <h3>{`${historyItem.role}`}</h3>
                                    <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                                    <ul>
                                        {historyItem.experiences.map((experience, id) => {
                                            return <li key={id}>{experience}</li>;
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ul> */}
            </div>
        </section>
    );
};
