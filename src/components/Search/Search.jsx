import {React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogByName } from "../../redux/actions";
import styles from "./Search.module.css";

export const Search = ({setCurrentPage})=>{//
  const [name, setName] = useState("");//manejamos de forma local los estados de nombre
  const dispatch = useDispatch();
 
  const allDogs = useSelector((state)=>state.dogs);//quedamos atentos al cambio del estado global de dogs

  const handleOnChange = (event)=>{
    event.preventDefault();
    setName(event.target.value);//ante un cambio seteamos el valor de name
    setCurrentPage(1);//seteamos la pagina actual en 1
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(name.length === 0) {//si no tenemos nombre, damos un alert
        return alert("Please write a name");
    } else{
        dispatch(getDogByName(name));//caso contrario despachamos la action que nos trae los nombres filtrados
        setName("");//seteamos el estado de nombre
    }

  };

  return(
      <div style = {{display: "inLine-block"}}>
        <input className={styles.input}
        type="text"
        placeholder="Breed searcher"
        value={name}
        onKeyPress={(e)=>e.key === "Enter" && handleSubmit(e)}
        onChange={(e)=>handleOnChange(e)}></input>
        &nbsp;
        <button className={styles.button7} type="submit" onClick={(e)=>handleOnChange(e)}>Search</button>
      </div>

  );
};


