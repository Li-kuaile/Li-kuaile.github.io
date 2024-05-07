import React from 'react'
import styles from './Projects.module.css'
import { getImageurl } from "../../utils"
import projects from "../../data/projects.json"
import { Link } from "react-router-dom"

export const Projects = () => {
    return (
        <section className={styles.container} id="projects">
            <h2 className={styles.title}>项目经历</h2>
            <div className={styles.projects}>
                {
                    projects.map((project, id) => {
                        return (
                            <div key={id} className={styles.project}>
                                <img src={project.imageSrc} className={styles.image} alt="project img" />
                                <Link to={project.source} className={styles.ptitle}><p >{project.title}</p></Link>
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
