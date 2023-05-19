import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails, cleanState } from "../../redux/actions";
import DogCard from "../../components/DogCard/DogCard";
import styles from "../Home/Home.module.css";

const Detail = () =>{
    

    const dispatch = useDispatch();
    const {id} = useParams();

    const dog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDogDetails(id))
          return ()=> {
            dispatch(cleanState())
          }
      }, [dispatch, id]);

    return(
      
        <div>

        {Object.entries(dog).length === 0 ? (<div style={{marginTop: "20", marginLeft: "50"}} className={styles.loader}></div>) :
        
        (<DogCard 
        name ={dog[0].name}
        img={dog[0].img}
        temperament={dog[0].temperament}
        weight={dog[0].weight}
        height={dog[0].height}
        lifeSpan={dog[0].lifeSpan}>

        </DogCard>)}
        
        </div>
    )
};

export default Detail;