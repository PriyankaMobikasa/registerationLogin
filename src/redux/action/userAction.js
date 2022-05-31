import * as type from '../userTypes';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export const fetchRequest = () => {
    return {
        type: type.FETCH_REQUEST
    }
}

export const fetchSuccess = (data) => {
    return {
        type: type.FETCH_SUCCESS,
        payload: data
    }
}

export const fetchFailure = (data) => {
    return {
        type: type.FETCH_FAILURE,
        payload: data
    }
}


// export const registerFetch = (fetchData) => {
//     return function (dispatch){
//         dispatch(fetchregister);
//         axios.post("http://localhost:5000/users/register",fetchData)
//         .then((response) => {
//             console.log(response, "from Action...")
//             // dispatch(registerSuccess(response.data))
//             dispatch(registerSuccess(response))

//             console.log(response, "from Action...")
//         })
//         .catch((error) => {
//             dispatch(registerFailure(error))
//         })
//     }
// }

export const fetchRequestAction = (url, data) => {
    return function (dispatch) {
        dispatch(fetchRequest);
        console.log(1)
        axios.post(url, data)
            .then((response) => {
                console.log(response, "from Action...")
                if (response.data.status) {
                    localStorage.setItem('Token', response.data)
                    dispatch(fetchSuccess(response.data))
                }
                else{
                    dispatch(fetchFailure())
                }
                // dispatch(registerSuccess(response.data))
                // cb(response)


                // console.log(response, "from Action...")
            })
            // .catch((error) => {
            //     dispatch(fetchFailure(error))
            // })
    }
}

