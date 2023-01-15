import axios from 'axios';
import { toast } from 'react-toastify';

// Action for fetching data

export const fetchDataRequest = () => {
    return {
        type: 'FETCH_DATA_REQUEST'
    };
};

export const fetchDataSuccess = (data) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    };
};

export const fetchDataFailure = (error) => {
    return {
        type: 'FETCH_DATA_FAILURE',
        payload: error
    };
};

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        try {
            toast.loading('Loading...');
            await axios.get('api/posts/get').then((res) => {
                const data = res.data;
                dispatch(fetchDataSuccess(data));
                toast.dismiss();
            });
        } catch (error) {
            dispatch(fetchDataFailure(error.message));
        }
    };
};

// Action for adding data

export const addDataRequest = () => {
    return {
        type: 'ADD_DATA_REQUEST'
    };
}

export const addDataSuccess = (data) => {
    return {
        type: 'ADD_DATA_SUCCESS',
        payload: data
    };
}

export const addDataFailure = (error) => {
    return {
        type: 'ADD_DATA_FAILURE',
        payload: error
    };
}

export const addData = (data) => {
    return async (dispatch) => {
        dispatch(addDataRequest());
        try {
            toast.loading('Loading...');
            await axios.post('/api/posts/add', data).then((res) => {
                toast.dismiss();
                const data = res.data;
                dispatch(addDataSuccess(data));
                toast.success('Data added successfully');
            });
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to add data', error);
            dispatch(addDataFailure(error.message));
        }
    };
}

