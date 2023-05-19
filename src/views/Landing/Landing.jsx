
import React from "react"
import { Link } from "react-router-dom"
import styles from "./Landing.module.css"

 const Landing = ()=>{
    return(
        <div>
            <header className={styles.showcase}>
    <h1>Welcome To Dogs App</h1>
    <Link to="/home" style={{textDecoration: "none"}}><a href="#" className={styles.button}>Get started!</a></Link>
  </header>
  </div>
    )
}

export default Landing;