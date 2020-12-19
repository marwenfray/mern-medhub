import{DOCTOR_LIST,LOGOUT} from '../const/actionTypes'


const initState={
    doctors:[],
};

export const adminReducer =(state=initState,{type,payload})=>{
    switch (type) {
        case DOCTOR_LIST:
            
            return {...state, doctors:payload};
        
        case LOGOUT:
            return{doctors:[]}    
    
        default:
            return state;
    }
}