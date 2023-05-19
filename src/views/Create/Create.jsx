import {React, useState, useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {getTemperaments, createDog} from "../../redux/actions";
import styles from "./Create.module.css";

const validate = (input) => {
    let errors = {};
    let twoSpaceExpression = /\s{2,}/g;
    let expression = /^[a-zA-Z ]+$/gm;
    let imgExpression = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/g;

    if(!input.name){
        errors.name = "Name is required";
    } else if (input.name.length === 1) {
        errors.name = "Name can not have less than 2 characters"
    } else if (input.name.length > 100) {
        errors.name = "Name can not have more than 200 characters"
    }
    if(twoSpaceExpression.test(input.name)) {
        errors.name = "Please, write a valid name"
    }
    if(parseInt(input.name)) {
        errors.name = "Name is invalid, write a text";
    } else if (!expression.test(input.name)) {
        errors.name = "Special caracters aren't supported";
    }
    if(!input.heightMin || !input.heightMax) {
        errors.height = "Height is required"
    }
    if(Number(input.heightMin <= 0) || Number(input.heightMin > 100)) {
        errors.height = "Minimun height must be in a number from 0 - 100"
    }
    if(Number(input.heightMax <= 0) || Number(input.heightMax > 100)) { 
        errors.height = "Maximun height must be in a number from 0 - 100"
    }
    if (Number(input.heightMin) > Number(input.heightMax)) {
        errors.height = "Minimun height can not be greater than maximum"
    }
    if(!input.weightMin || !input.weightMax) {
        errors.weight = "Weight is required"
    }
    if(Number(input.weightMin <= 0) || Number(input.weightMin > 100)) {
        errors.weight = "Minimun weight must be in a number from 0 - 100"
    }
    if(Number(input.weightMax <= 0) || Number(input.weightMax > 100)) {
        errors.weight = "Maximun weigth must be in a number from 0 - 100"
    }
    if (Number(input.weightMin) > Number(input.weightMax)) {
        errors.weight = "Minimun weight can not be greater than maximum"
    }
    if(!input.img) {
        errors.img = "Image is required"
    } else if (!imgExpression.test(input.img)){
        errors.img = "Invalid URL"
    }
    if(!input.life_span) {
        errors.age = "Life span is required"
    } else if (input.life_span > 20 || input.life_span < 1) {
        errors.age = "Life span must be in a number from 1 - 20"
    }
    if(input.temperament.length) {
        errors.temperament = "Select at least temperament"
    }
    return errors;
};



 const Create = () =>{
 
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState("");
    const [input, setInput] = useState({
        name: "",
        life_span: "",
        img: "",
        temperament: [],
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
    });

    useEffect(()=>{
        dispatch(getTemperaments());
    },[dispatch]);

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value,
        })
        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value,
        }));
    };

    const handleSelect = (event)=>{
        if(input.temperament.find((temp) => temp.id === event.target.value.split(",")[0])){
            console.log({input});
            alert("Already in the list");
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament,
                {id: event.target.value.split(",")[0],
                name: event.target.value.split(",")[1]}]
            });
        }
    };

    const handleDelete = (event) => {
        setInput({
            ...input,
            temperament: input.temperament.filter((elem)=> elem !== event),
        });
    };

    const handleSubmit = (event) => {
        if(input.name && !parseInt(input.name) && 
        input.life_span && 
        input.weightMin && input.weightMax && 
        input.heightMin && input.heightMax &&
        input.img &
        input.temperament && input.temperament.length > 0) 
        {
          event.preventDefault();
          dispatch(
            createDog({
                name:input.name,
                life_span:input.life_span,
                img: input.img,
                heightMax: input.heightMax,
                heightMin: input.heightMin,
                weightMax: input.weightMax,
                weightMin: input.weightMin,
                temperament: input.temperament.map((temp) => Number(temp.id))
            })
          );
          alert("Succes! your dog was created");
          setInput({
            name: "",
            life_span: "",
            img: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            temperament:[],
          });
          history.push("/home")
        } else {
            alert("incomplete or wrong information");
            event.preventDefault();
        }
    };

    return(
        <div className={styles.background}>
        <div className={styles.container}>
   
        <form className={styles.form} onSubmit = {(event) => { handleSubmit(event) }}> 
             <Link className = {styles.button7} to ="/home"> Return </Link>
               <h3 className={styles.tittle}> Create your own breed </h3>
           {/* inputs */}
           <div className={styles.inputContainer}>
           {/* BreedName */}
           <div>
                <input 
                   className={styles.input}
                   type= "text"
                   placeholder= "Breed name"
                   value={input.name}
                   name="name"
                   onChange={(event) => handleChange(event)}>

                </input>
            </div>
            {errors.name && <a className={styles.error}>{errors.name}</a>}
            <br></br>
            {/* life Span */}
            <div>
                <input 
                    className={styles.input}
                    type= "number"
                    placeholder= "Life Span"
                    value={input.life_span}
                    name="life_span"
                    onChange={(event) => handleChange(event)}>
                
                </input>
            </div>          
            {errors.life_span && <a className={styles.error}>{errors.life_span}</a>}      
            <br></br>
            <div>
            {/* heightMax */}
            <div>
                <input 
                    className={styles.input}
                    type= "number"
                    min="0"
                    placeholder= "Maximun height"
                    value={input.heightMax}
                    name="heightMax"
                    onChange={(event) => handleChange(event)}>

                </input>
            </div>
            <br></br>
            {/* heightMin */}
            <div>
                <input 
                    className={styles.input}
                    type= "number"
                    min="0"
                    placeholder= "Minimun height"
                    value={input.heightMin}
                    name="heightMin"
                    onChange={(event) => handleChange(event)}>
                </input>
            </div>
            {(errors.height && <a className={styles.error}>{errors.height}</a>)}
            </div>
            <br></br>
            <div>
            {/* weightMax */}
            <div>
                <input 
                    className={styles.input}
                    type= "number"
                    min="0"
                    placeholder= "Maximun weight"
                    value={input.weightMax}
                    name="weightMax"
                    onChange={(event) => handleChange(event)}>
                </input>
            </div>
            <br></br>
            {/* weightMin */}
            <div>
                <input 
                    className={styles.input}
                    type= "number"
                    min="0"
                    placeholder= "Minimun weight"
                    value={input.weightMin}
                    name="weightMin"
                    onChange={(event) => handleChange(event)}>
                </input>
            </div>
            {(errors.height && <a className={styles.error}>{errors.weight}</a>)}
            </div>
            <br></br>
            {/* Image */}
            <div>
                <input 
                    className={styles.input}
                    type= "URL"
                    placeholder= "URL of image"
                    value={input.img}
                    name="img"
                    onChange={(event) => handleChange(event)}>
                </input>
            </div>
            {(errors.img && <a className={styles.error}>{errors.img}</a>)}
            <br></br>
            { /*Temperament*/ }
            <div>
                <select className={input.temperament.length >= 6 ? styles.notInput : styles.input} onChange={(event) => handleSelect(event)}>
                    {temperaments?.map((elem, i)=>(
                        <option value={`${elem.id},${elem.name}`} key={i}> {elem.name}</option>
                    ))}
                </select>
                <div>
                    {input.temperament.map((elem, i)=>(
                        <button className={styles.button7}
                                key= {i}
                                type= "reset"
                                onClick={()=> handleDelete(elem)}> {elem.name} </button>
                    ))}&nbsp;
                    <br></br>
                    <span style={{color:"white"}}> Select 1 to 6 temperaments </span>
                    <br></br>

                    <button className={styles.submit}
                            type= "submit"
                            onClick={(event)=> handleSubmit(event)}> Created breed </button>
                </div>
             </div>
           </div>           
        </form>
     </div>
     </div>

    )
};

export default Create;

