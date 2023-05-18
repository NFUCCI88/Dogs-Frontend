import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetails } from "../../redux/actions";
import DogCard from "../../components/DogCard/DogCard";
import styles from "../Home/Home.module.css";

const Detail = () =>{
    

    const dispatch = useDispatch();
    const {id} = useParams();
    const [dogs, setDogs] = useState({});

    const dog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDogDetails(id)).then((e)=>{
          setDogs(e.payload)
        })
      }, [dispatch, id]);

    return(
      
        <div>

        {Object.entries(dogs).length === 0 ? (<div style={{marginTop: "20", marginLeft: "50"}} className={styles.loader}></div>) : (<DogCard name ={dogs[0].name}
        img={dogs[0].img}
        temperament={dogs[0].temperament}
        weight={dogs[0].weight}
        height={dogs[0].height}
        lifeSpan={dogs[0].lifeSpan}></DogCard>)}
        
        </div>
    )
};

export default Detail;