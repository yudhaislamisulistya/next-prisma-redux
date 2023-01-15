
const initialState = {
    data: [],
    loading: false,
    error: null
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_DATA_SUCCESS':
            return { ...state, data: action.payload, loading: false };
        case 'FETCH_DATA_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'ADD_DATA_REQUEST':
            return { ...state, loading: true };
        case 'ADD_DATA_SUCCESS':
            return { ...state, data: [...state.data, action.payload], loading: false };
        case 'ADD_DATA_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'DELETE_DATA_REQUEST':
            return { ...state, loading: true };
        case 'DELETE_DATA_SUCCESS':
            return { ...state, data: state.data.filter((item) => item._id !== action.payload), loading: false };
        case 'DELETE_DATA_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default postsReducer;