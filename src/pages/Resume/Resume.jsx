import React from 'react'
import { Navbar } from '../../componets/Navbar/Navbar'
import { Hero } from '../../componets/Hero/Hero'
import { About } from '../../componets/About/About'
import { Experience } from '../../componets/Experience/Experience'
import { Projects } from '../../componets/Projects/Projects'
import { Contact } from '../../componets/Contact/Contact'
import { Totop } from '../../componets/Totop/Totop'
import { Learn } from '../../componets/Learn/Learn'

import styles from './Resume.module.css'
export default function Resume() {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Learn />
      <Projects />
      <Contact />
      <Totop />
    </div>
  )
}
