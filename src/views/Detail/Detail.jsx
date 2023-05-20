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
        weightMin={dog[0].weightMin}
        weightMax={dog[0].weightMax}
        heightMin={dog[0].heightMin}
        heigthMax={dog[0].heigthMax}
        life_span={dog[0].life_span}>

        </DogCard>)}
        
        </div>
    )
};

export default Detail;