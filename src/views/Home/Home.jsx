import { getDogs, getTemperaments,filterByTemperaments, filterByName, filterByWeight } from "../../redux/actions";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination";
import DogsContainer from "../../components/DogsContainer/DogsContainer";
import { Link } from "react-router-dom";
import {Search} from "../../components/Search/Search";
import styles from './Home.module.css';


const Home = () =>{

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);//quedamos atentos al cambio de estado global dogs

    const [currentPage, setCurrentPage] = useState(1);//manejamos los estados de la pagina actual
    const dogsCardsPerPage = 8;//cantidad de perros por pagina
    const numberOfLastDog = currentPage * dogsCardsPerPage;//definimos la cantidad de perros a mostrar
    const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
    const pagination = (pageNumber) => {//al pasar el numero de pagina retornamos el estado de la pagina actual con ese numero
        setCurrentPage(pageNumber)
    };

    useEffect(()=>{//al montarse se despachan las actions 
     dispatch(getDogs());
     dispatch(getTemperaments());
     dispatch(filterByTemperaments());
    }, [dispatch]);

    const paginationPrev = ()=>{
        if(currentPage > 1) setCurrentPage(currentPage - 1)//si la pagina actual es mayor a uno, actualizo su estado pasandole el valor de la pagina actual y le restamos uno
    };

    const paginationNext = ()=>{
        let lastPage = Math.ceil(allDogs.length / dogsCardsPerPage);//obtenemos la ultima pagina 
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);//si la pagina actual es menor a la ultima pagina, actualizo el estado de la pagina y le sumo uno
    };

    const temperaments = useSelector((state)=> state.temperaments);//quedamos atentos al cambio de estado global temperamentos
    const [temperament, setTemperament] = useState("all");//manejamos los estados de los temperamentos inicinado su estado en all

    const handleSelectTemperament = (event)=>{//cuando seleccionamos un temperamento, se despacha el valor que posee la actions que filtra los temperamentos
        dispatch(filterByTemperaments(event.target.value));
        setTemperament(event.target.value);//actualizamos los temperamentos
        setCurrentPage(1);//actualizamos el estado de la pagina actual con valor 1
    };

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getDogs());//ante un click despachamos la action que me trae todos los perros
        setFilterName("normal");//seteamos el filtro de nombres en "normal"
        setFilterWeight("normal");//seteamos el filtro de pesos en "normal"
        setTemperament("all");//seteamos el estado de los temperamentos en "all"
        setCurrentPage(1);//actualizamos el estado de la pagina actual 1
    };

    const [filterWeight, setFilterWeight] = useState("");//manejamos el estado local de los filtros por peso

    const handleSortWeight = (event)=>{
        if(event.target.value === "normal") {//si el valor es igual a normal que se despache la action que trae todos los perros
            dispatch(getDogs());
        }
        dispatch(filterByWeight(event.target.value));// despachamos la action que filtra por peso con su valor
        setFilterWeight(event.target.value);//actualizamos los perros filtrados
        setCurrentPage(1);//actualizamos el estado de la pagina actual 1
        setFilterName("");//debemos tener el filtrado por nombre vacio
    };

    const [filterName, setFilterName] = useState("");//manejamos el estado local de los filtros por nombre

    const handleSortName = (event)=>{
      if(event.target.value === "normal") {//si el valor es igual a normal que se despache la action que trae todos los perros
            dispatch(getDogs());
        }
        dispatch(filterByName(event.target.value));// despachamos la action que filtra por nombre con su valor
        setFilterName(event.target.value);//actualizamos los perros filtrados
        setCurrentPage(1);//actualizamos el estado de la pagina actual con valor 1
        setFilterWeight("");//debemos tener el filtrado por peso vacio
    };

    return(
<div>
      {currentDogs.length === 0 ? (<div style={{ marginTop: "20%", marginLeft: "50%" }} className={styles.loader}> </div>) :
        (<div className={styles.homeContainer} >
           <h1 className={styles.margin}></h1>
            <div className={styles.navBar}>
             <div className={styles.filters}>
              <div>
                <div>
                  <div>
                    <h1>Dogs App</h1>
                 
                    <Link className={styles.button7} to="/create">Create dog</Link> 
                    
                    <span> Filter by temperament </span>
                    <select className={styles.input}
                      value={temperament}
                      onChange={(e) => handleSelectTemperament(e)}
                    >
                      <option value="all"> All </option>
                      {temperaments.map((temp, index) => (
                        <option onClick={(e) => handleClick(e)} key={index}>
                          {temp.name}
                        </option>
                      ))}
                    </select> 

                    <span> Sort by weight </span>
                    <select className={styles.input} value={filterWeight} onChange={(event) => handleSortWeight(event)}>
                      <option value="normal"> ----- </option>
                      <option value="asc"> Lightest </option>
                      <option value="desc"> Heaviest</option>
                    </select>

                    <span> Sort by name </span>
                    <select className={styles.input} value={filterName} onChange={(event) => handleSortName(event)}>
                      <option value="normal"> ----- </option>
                      <option value="az"> A - Z </option>
                      <option value="za"> Z - A </option>
                    </select>
                    <Search setCurrentPage={setCurrentPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardList} >
            {
              currentDogs.map(dog => (
                <DogsContainer
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  temperament={dog.temperament}
                  weightMin={dog.weightMin}
                  weightMax={dog.weightMax}
                  img={dog.img}
                />
              ))
            }

          </div>
          <div className={styles.center}>
            <Pagination
              dogsCardsPerPage={dogsCardsPerPage}
              allDogs={allDogs.length}
              pagination={pagination}
              paginationPrev={paginationPrev}
              paginationNext={paginationNext}
              currentPage={currentPage}
            />
          </div>
        </div>
        )}
    </div>
  )
}




export default Home;