import * as c from '../constants/Source'

const initialState = {
    sourceFetchedSuccess : false,
    item: {
        id: '',
        title: "",
        address: "",
        latitude: '',
        longitude: '',
        route: '',
        description: '',
        type: '',
        typeText: "",
        analiz: false,
        distance: "",
        pressure: "",
        rating: "",
        visitors: "",
        img: '',
        success: false
    },
}

export default function app(state = initialState, action){
    switch(action.type) {
        case c.RECEIVED_SOURCE:
            return {
                ...state,
                item: action.item
            }
        case c.FETCH_SOURCE_SUCCESS:
            return {
                ...state,
                sourceFetchedSuccess : true
            }
        case c.FETCH_SOURCE_FAIL:
            return {
                ...state,
                sourceFetchedSuccess : false
            }
        case c.FETCH_SOURCE_CANCEL:
            return {
                ...state,
                sourceFetchedSuccess: false
            }
        default:
            return state
    }
}
