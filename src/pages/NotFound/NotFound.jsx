import React from 'react'
import styles from './NotFound.module.css'
import { Link,useLocation,useParams } from "react-router-dom";
export default function NotFound(props) {
  const location = useLocation();
  let isdark=props.isdark;
  const regex = /^\/blog\b/;
  return (
    <div className={styles.container}>
      <div>
        <title>404</title>

      </div>
      <div className={styles.body}>

        <div className={isdark?styles.dark:styles.number}>404</div>

        <div className={styles.text}>李快乐提示您： <span>Page Not Found</span>Sorry, the page you are looking for might have been deleted</div>

        <Link to={regex.test(location.pathname) ? "/blog":"/"}><button className={styles.twinkle}>返回首页</button></Link>

      </div>
    </div>
  )
}


