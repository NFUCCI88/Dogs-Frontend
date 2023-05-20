import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";

const DogCard = (props) =>{
    const {img, name, height, weight, lifeSpan, temperament} = props;
   
 

console.log(props)

    return(
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.leftSide}>
                            <h1 className= {styles.tittle}>Dog Details</h1>
                            <div className="detail">
                                <h3>{name}</h3>
                                <h5>Height : {height} kg </h5>
                                <h5>Weight : {weight} cm </h5>
                                <h5>Life Span : {lifeSpan}</h5>
                                <h6>Temperaments : {temperament}</h6>
                                <Link className={styles.button7} to ="/home">HOME</Link>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            <img src={img} alt={name}></img>
                        </div>
                    </div>
                </div>
            </div>
            </div>    
    )
    
};

export default DogCard;
