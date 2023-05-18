import { Link } from "react-router-dom";
import style from "./NavBar.module.css";




const NavBar = ()=>{
    

	return (
		<nav>
			<div>
				<Link to="/home">
					<img/>
				</Link>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/create">Create</Link>
					</li>
			
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;