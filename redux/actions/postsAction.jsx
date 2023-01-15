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
            toast.promise(axios.get('/api/posts/get'), {
                loading: 'Loading...',
                success: 'Data fetched successfully',
                error: 'Error fetching data'
            }).then((res) => {
                const data = res.data;
                dispatch(fetchDataSuccess(data));
            }).catch((err) => {
                dispatch(fetchDataFailure(err.message));
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
            toast.promise(axios.post('/api/posts/add', data), {
                loading: 'Adding...',
                success: 'Data added successfully',
                error: 'Failed to add data'
            }).then(() => {
                toast.dismiss();
                dispatch(addDataSuccess(data));
            }).catch((error) => {
                dispatch(addDataFailure(error.message));
            });
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to add data', error);
            dispatch(addDataFailure(error.message));
        }
    };
}

// Action for deleting data

export const deleteDataRequest = () => {
    return {
        type: 'DELETE_DATA_REQUEST'
    };
}

export const deleteDataSuccess = (id) => {
    return {
        type: 'DELETE_DATA_SUCCESS',
        payload: id
    };
}

export const deleteDataFailure = (error) => {
    return {
        type: 'DELETE_DATA_FAILURE',
        payload: error
    };
}

export const deleteData = (id) => {
    return async (dispatch) => {
        dispatch(deleteDataRequest());
        try {
            // make loading second toast
            toast.loading('Loading...');

            await toast.promise(axios.delete(`/api/posts/delete/${id}`), {
                loading: 'Deleting...',
                success: 'Data deleted successfully',
                error: 'Failed to delete data'
            }).then(() => {
                toast.dismiss();
                dispatch(deleteDataSuccess(id));
                dispatch(fetchData());
            }).catch((error) => {
                dispatch(deleteDataFailure(error.message));
            });
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to delete data', error);
            dispatch(deleteDataFailure(error.message));
        }
    };
}


