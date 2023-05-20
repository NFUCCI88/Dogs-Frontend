import { getDogs, getTemperaments,filterByTemperaments, filterByName, filterByWeight } from "../../redux/actions";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../components/Pagination/Pagination";
import DogsContainer from "../../components/DogsContainer/DogsContainer";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import styles from './Home.module.css';


const Home = () =>{

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    const [currentPage, setCurrentPage] = useState(1);
    const dogsCardsPerPage = 8;
    const numberOfLastDog = currentPage * dogsCardsPerPage;
    const numberOfFirstDog = numberOfLastDog - dogsCardsPerPage;
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(()=>{
     dispatch(getDogs());
     dispatch(getTemperaments());
     dispatch(filterByTemperaments());
    }, [dispatch]);

    const paginationPrev = ()=>{
        if(currentPage > 1) setCurrentPage(currentPage - 1)
    };

    const paginationNext = ()=>{
        let lastPage = Math.ceil(allDogs.length / dogsCardsPerPage);
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
    };

    const temperaments = useSelector((state)=> state.temperaments);
    const [temperament, setTemperament] = useState("all");

    const handleSelectTemperament = (event)=>{
        dispatch(filterByTemperaments(event.target.value));
        setTemperament(event.target.value);
        setCurrentPage(1);
    };

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getDogs());
        setFilterName("az");
        setFilterWeight("normal");
        setTemperament("all");
        setCurrentPage(1);
    };

    const [filterWeight, setFilterWeight] = useState("");

    const handleSortWeight = (event)=>{
        if(event.target.value === "normal") {
            dispatch(getDogs());
        }
        dispatch(filterByWeight(event.target.value));
        setFilterWeight(event.target.value);
        setCurrentPage(1);
        setFilterName("");
    };

    const [filterName, setFilterName] = useState("");
    const handleSortName = (event)=>{
      event.preventDefault();
        dispatch(filterByName(event.target.value));
        setFilterName(event.target.value);
        setCurrentPage(1);
        setFilterName("");
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
                      onChange={(event) => handleSelectTemperament(event)}
                    >
                      <option value="all"> All </option>
                      {temperaments.map((temp, index) => (
                        <option onClick={(event) => handleClick(event)} key={index}>
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
                      <option value="az"> A - Z </option>
                      <option value="za"> Z - A </option>
                    </select>
                    <SearchBar setCurrentPage={setCurrentPage} />
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