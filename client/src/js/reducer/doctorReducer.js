import{PATIENT_LIST,ADD_PATIENT,LOGOUT} from '../const/actionTypes'

const initState={
    patients:[],
    isLoading:true
    
}
export const doctorReducer=(state = initState, { type, payload })=>{
    switch (type) {
        case PATIENT_LIST:
             return{...state,patients:payload,isLoading:false}    
        case ADD_PATIENT:
            return{...state, patients:[...state.patients, payload],isLoading:false}
        case LOGOUT:
            return{...state,patients:[],isLoading:false}
        default:
            return state;
    }



}