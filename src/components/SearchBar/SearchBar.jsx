import {React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

export const SearchBar = ({setCurrentPage})=>{
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const allDogs = useSelector((state)=>state.dogs);

  const handleOnChange = (event)=>{
    setName(event.target.value);
    setCurrentPage(1);
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(name.length === 0) {
        return alert("Please write a name");
    } else{
        dispatch(getDogByName(name));
        setName("");
    }
  };

  return(
      <div style = {{display: "inLine-block"}}>
        <input className={styles.input}
        type="text"
        placeholder="Breed searcher"
        value={name}
        onKeyPress={(event)=>event.key === "Enter" && handleSubmit(event)}
        onChange={(event)=>handleOnChange(event)}></input>
        &nbsp;
        <button className={styles.button7} type="submit" onClick={(event)=>handleOnChange(event)}>Search</button>
      </div>

  );
};


