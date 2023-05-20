import { Link } from "react-router-dom";
import styles from "./DogsContainer.module.css";



const DogsContainer = (props) =>{
    const {id, name, temperament, weight, img} = props

    console.log(typeof(weight))
    return(
        <div className={styles.card} style={{ textAlign: "center"}} key = {id}>
            <Link to={`/detail/${id}`} style={{textDecoration: "none", color: "#001213"}}>
                <div className={styles.cardImage}>
                    <img src={img} alt={name}></img>
                </div>
                <div className={styles.cardBody}>
                    <h2>{name}</h2>
                    <p><strong>Temperaments : </strong>{temperament}</p>
                    <p>{weight} kg </p>
                </div>
            </Link>
            

        </div>
    )
    
}

export default DogsContainer;