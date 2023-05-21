import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";




const NavBar = ()=>{
    

	return (
        <div className={styles.container}>
			 
            <ul>
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/create">
                    <li>Create dog!</li>
                </Link>
                <Link to="/">
                    <li>Exit</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar;