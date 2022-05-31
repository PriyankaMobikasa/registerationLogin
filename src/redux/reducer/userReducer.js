import * as type from "../userTypes";

const initialState = {
    loading : false,
    data : [],
    error : false,
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case type.FETCH_REQUEST:
            return {
                ...state,
                loading : true,
                data : [],
                error : false,
                
            }   
        
        case type.FETCH_SUCCESS:
            console.log(action.payload, "action.payload")
            // const token =  action.payload.s 
            localStorage.setItem('Token', JSON.stringify(action.payload.token))
            return{
                ...state,
                loading : false,
                data : action.payload,
                error : false,
               
            }

        case type.FETCH_FAILURE:
            return{
                ...state,
                loading : false,
                error : true,
            }          
    
        default:
            return state
            
    }
}

