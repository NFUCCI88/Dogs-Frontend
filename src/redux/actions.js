import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_WEIGHT = "FILTER_BY_WEIGHT";
export const UPDATE_DOG = "UPDATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const CLEAN_STATE = "CLEAN_STATE";


export const getDogs = () => async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs`);
         dispatch({
          type: GET_DOGS,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    export const getTemperaments = () => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/temperaments`);
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    export const getDogByName = (name) => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            dispatch({
                type: GET_DOG_BY_NAME,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GET_DOG_BY_NAME,
                payload: ["No dogs found"],
            });
        }
    };

    export const getDogDetails = (id) => async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({
                type: GET_DOG_DETAILS,
                payload: response.data,
            });
        } catch (error) {
             dispatch({
                type: GET_DOG_DETAILS,
                payload: ["No dogs found"],
            });
        }
    };

    export const createDog = (dog) => async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3001/dogs`, dog);
            dispatch({
                type: CREATE_DOG,
                payload: response.data,
            });
        } catch (error) {
            return { error: true, message: error.response.data.message };
        }
    };

    export const filterByTemperaments = (payload) => (dispatch) => {
        dispatch({
          type: FILTER_BY_TEMPERAMENTS,
          payload,
        });
      };

      export const filterByName = (payload) => (dispatch) => {
        dispatch({
            type: FILTER_BY_NAME,
            payload,
        });
    };

    export const filterByWeight = (payload) => (dispatch) => {
        dispatch({
            type: FILTER_BY_WEIGHT,
            payload,
        });
    };

    export const updateDog = (dog) => async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3001/dogs/${dog.id}`, dog);
            dispatch({
                type: UPDATE_DOG,
                payload: response.data,
            });
        } catch (error) {
            return { error: true, message: error.response.data.message };
        }
    };

    export const deleteDog = (id) => async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3001/dogs/${id}`);
            dispatch({
                type: DELETE_DOG,
                payload: id,
            });
        } catch (error) {
            return { error: true, message: error.response.data.message };
        }
    };

    export const cleanState = () => (dispatch) => {
        dispatch({
            type: CLEAN_STATE,
        });
    };