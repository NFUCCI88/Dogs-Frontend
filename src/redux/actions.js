import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const CLEAN_STATE = "CLEAN_STATE";


export const getDogs = () => async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs`);//hacemos la solicitud al servidor
         dispatch({
          type: GET_DOGS,
          payload: response.data,//despachamos la informacion que nos devuelve el servidor
        });
      } catch (error) {//manejamos respuesta en caso de que haya algun error
        console.error(error);
      }
    };
  
    export const getTemperaments = () => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/temperaments`);//hacemos la solicitud al servidor
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data,//despachamos la informacion que nos devuelve el servidor
            });
        } catch (error) {
            console.log(error);//manejamos respuesta en caso de que haya algun error
        }
    };

    export const getDogByName = (name) => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);//hacemos la solicitud al servidor
            dispatch({
                type: GET_DOG_BY_NAME,
                payload: response.data,//despachamos la informacion que nos devuelve el servidor
            });
        } catch (error) {
            dispatch({
                type: GET_DOG_BY_NAME,//si no se encuentra al perro, despachamos la action con el payload No se encontraron perros
                payload: ["No dogs found"],
            });
        }
    };

    export const getDogDetails = (id) => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);//hacemos la solicitud al servidor
            dispatch({
                type: GET_DOG_DETAILS,
                payload: response.data,//despachamos la informacion que nos devuelve el servidor
            });
        } catch (error) {
             dispatch({
                type: GET_DOG_DETAILS,
                payload: ["No dogs found"],//si no se encuentra al perro, despachamos la action con el payload No se encontraron perros
            });
        }
    };

    export const createDog = (dog) => async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/dogs`, dog);//hacemos una solicitud post al servidor
            dispatch({
                type: CREATE_DOG,
                payload: response.data,//despachamos la informacion que nos devuelve el servidor
            });
        } catch (error) {
            return { error: true, message: error.response.data.message };//si hay un error, devolvemos un objeto con el error y el mensaje
        }
    };

    export const filterByTemperaments = (payload) => (dispatch) => {
        dispatch({
          type: FILTER_BY_TEMPERAMENTS,//despachamos la action 
          payload,
        });
      };

      export const filterByName = (payload) => (dispatch) => {
        dispatch({
            type: FILTER_BY_NAME,//despachamos la action 
            payload,
        });
    };

    export const filterByWeight = (payload) => (dispatch) => {
        dispatch({
            type: FILTER_BY_WEIGHT,//despachamos la action 
            payload,
        });
    };

    export const cleanState = () => (dispatch) => {
        dispatch({//despachamos la action 
            type: CLEAN_STATE,
        });
    };