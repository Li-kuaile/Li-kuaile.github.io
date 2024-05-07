import React from 'react'
import styles from './Projects.module.css'
import { getImageurl } from "../../utils"
import projects from "../../data/projects.json"

export const Projects = () => {
    return (
        <section className={styles.container} id="projects">
            <h2 className={styles.title}>项目经历</h2>
            <div className={styles.projects}>
                {
                    projects.map((project, id) => {
                        return (
                            <div key={id} className={styles.project}  onClick={()=>{window.location.href=`/blog/projects/${id}`}}>
                                <img src={project.imageSrc} className={styles.image} alt="project img" />
                                <p className={styles.ptitle}>{project.title}</p>
                                <p className={styles.pdescription}>{project.description}</p>
                                <ul className={styles.skills}>
                                    {project.skills.map((skill, index) => {
                                        return (
                                            <li key={index} className={styles.skill}>
                                                {skill}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
