import { GET_DOGS, 
    GET_TEMPERAMENTS, 
    GET_DOG_BY_NAME, 
    GET_DOG_DETAILS, 
    CREATE_DOG, 
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_NAME, 
    FILTER_BY_WEIGHT, 
    CLEAN_STATE} from "./actions";



//Definimos un estado global inicial
const initialState = {
    dogs:[],
    temperaments: [],
    detail: [],
    filterDogs: [],
}
export default function reducer(state = initialState, action) {//Definimos la funcion reducer
    switch(action.type){
        case GET_DOGS://Si el tipo de acción es GET_DOGS, devuelve una copia del estado con la matriz de perros actualizada
            return {
                ...state,
                dogs:action.payload,
                filterDogs: action.payload,
            };
        case GET_TEMPERAMENTS://Si el tipo de acción es TEMPERAMENTS, devuelve una copia del estado con la matriz de los temperamentos actualizada
            return {
                ...state,
                temperaments:action.payload,
            };
        case GET_DOG_BY_NAME://Si el tipo de acción es GET_DOG_BY_NAME, devuelve una copia del estado con la matriz de perros actualizada
            return{
                ...state,
                dogs:action.payload,
                filterDogs: action.payload,
            };
        case GET_DOG_DETAILS://Si el tipo de acción es  GET_DOG_DETAILS, devuelve una copia del estado con la matriz del detalle del perro actualizada
            return{
                ...state,
				detail: action.payload,//llene el detail con el valor que me dio la accion
            };
        case CREATE_DOG://Si el tipo de acción es CREATE_DOG, solo retornamos la copia del estado
        return {
            ...state,
        };
        case FILTER_BY_TEMPERAMENTS: //Si el tipo de acción es FILTER_BY_TEMPERAMENTS, nos guardamos los perros filtrados
        const allDogs = state.filterDogs;
        const filterDogs =//si los perros filtrados tienen como valor todos, retornamos todos los perros, sino, hacemos un filtro donde por cada temperamento del perro, si lo tiene, nos incluya el valor
        action.payload === "all"
            ? allDogs
            : allDogs.filter((dog) => dog.temperament?.includes(action.payload));
        return {
          ...state,//retornamos una copia del estado con la propiedad dogs con los perros filtrados por ese temperamento-valor
          dogs: filterDogs,
        };
        case FILTER_BY_NAME://Si la acción es ORDER_DOGS_BY_NAME, devuelve una copia del estado con los perros ordenados por nombre
            const allDogsByName = [...state.dogs];//definimos un nuevo array con todos los perros
            if (action.payload === "any" || action.payload === "default") {//si la action payload es any o default, retornamos la copia del estado con todos los perros
				return {
					...state,
					dogs: allDogsByName,
				}}
        const filterByName =
        action.payload === "az"//si la action payload es az, retornamos la copia del estado ordenado de forma ascendente
            ? state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
              })
            : state.dogs.sort((a, b) => {//caso contrario, retornamos la copia del estador ordenado de forma descendente
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
              });
        return {
          ...state,
          dogs: filterByName,

    };
        case FILTER_BY_WEIGHT://definimos un nuevo array con todos los perros
            const allDogsByWeight = [...state.dogs];

			const weightMin = (dog) => {//Transformamos los valores de peso mínimo y peso máximo en números (si no son números, devuelva 0)
				return Number(dog.weightMin) || 0;
			};
			const weightMax = (dog) => {
				return Number(dog.weightMax) || 0;
			};
			
			const weightAvg = (dog) => {//calculamos el porcentaje del peso del perro 
				return (weightMin(dog) + weightMax(dog)) / 2;
			};

			if (action.payload === "any" || action.payload === "default") {//si la action payload es any o default, retornamos la copia del estado con el porcentaje del peso del perros
				return {
					...state,
					dogs: allDogsByWeight,
				};
			};
            const dogsByWeight =
				action.payload === "asc"//si la action payload es asc, devolvemos una copia del estado con los perros ordenados con su peso promedio de forma ascendente
					? allDogsByWeight.sort((a, b) => {
							if (weightAvg(a) > weightAvg(b)) return 1;
							if (weightAvg(a) < weightAvg(b)) return -1;
							return 0;
					  })
					: 
					  allDogsByWeight.sort((a, b) => {//caso contrario, lo devolvemos de forma descendente
							if (weightAvg(a) > weightAvg(b)) return -1;
							if (weightAvg(a) < weightAvg(b)) return 1;
							return 0;
					  });
			if (dogsByWeight.length === 0) {//si esta vacio, enviamos el siguiente mensaje
				dogsByWeight.push("No dogs found");
			}
			return {
				...state,//retornamos una copia del estado con los perros filtrados por peso
				dogs: dogsByWeight,
			};
         case CLEAN_STATE://si la action es CLEAN STATE, devolvemos una copia del estado con el array de detalles vacio
                return {
                    ...state,
                    detail:[],
                };
                default:
                    return state;

};
};

