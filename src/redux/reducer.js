import { GET_DOGS, 
    GET_TEMPERAMENTS, 
    GET_DOG_BY_NAME, 
    GET_DOG_DETAILS, 
    CREATE_DOG, 
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_NAME, 
    FILTER_BY_WEIGHT, 
    UPDATE_DOG,
    DELETE_DOG,
    CLEAN_STATE} from "./actions";




const initialState = {
    dogs:[],
    temperaments: [],
    detail: [],
    filterDogs: [],
}
export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs:action.payload,
                filterDogs: action.payload,
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments:action.payload,
            };
        case GET_DOG_BY_NAME:
            return{
                ...state,
                dogs:action.payload,
                filterDogs: action.payload,
            };
        case GET_DOG_DETAILS:
            return{
                ...state,
				detail: action.payload,
            };
        case CREATE_DOG:
        return {
            ...state,
        };
        case FILTER_BY_TEMPERAMENTS: 
        const allDogs = state.filterDogs;
        const filterDogs =
        action.payload === "all"
            ? allDogs
            : allDogs.filter((dog) => dog.temperament?.includes(action.payload));
        return {
          ...state,
          dogs: filterDogs,
        };
        case FILTER_BY_NAME:
        const filterByName =
        action.payload === "az"
            ? state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
              })
            : state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
              });
        return {
          ...state,
          dogs: filterByName,

    };
        case FILTER_BY_WEIGHT:
            const allDogsByWeight = [...state.dogs];

			const weightMin = (dog) => {
				return Number(dog.weightMin) || 0;
			};
			const weightMax = (dog) => {
				return Number(dog.weightMax) || 0;
			};
			
			const weightAvg = (dog) => {
				return (weightMin(dog) + weightMax(dog)) / 2;
			};

			if (action.payload === "any" || action.payload === "default") {
				return {
					...state,
					dogs: allDogsByWeight,
				};
			};
            const dogsByWeight =
				action.payload === "asc"
					? allDogsByWeight.sort((a, b) => {
							if (weightAvg(a) > weightAvg(b)) return 1;
							if (weightAvg(a) < weightAvg(b)) return -1;
							return 0;
					  })
					: 
					  allDogsByWeight.sort((a, b) => {
							if (weightAvg(a) > weightAvg(b)) return -1;
							if (weightAvg(a) < weightAvg(b)) return 1;
							return 0;
					  });
			if (dogsByWeight.length === 0) {
				dogsByWeight.push("No dogs found");
			}
			return {
				...state,
				dogs: dogsByWeight,
			};
            case UPDATE_DOG: 
            return {
				...state,
			};
            case DELETE_DOG:
                return {
                    ...state,
                };
            case CLEAN_STATE:
                return {
                    ...state,
                    detail:[],
                };
                default:
                    return state;

};
};

