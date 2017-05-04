import {SERVER_URL, RECEIVED_SOURCE} from '../constants/Add'

const initialState = {
    form: {
        isValid: false,
        fields: 0
    }
}

export default function app(state = initialState, action){
    switch(action.type) {
        case  RECEIVED_SOURCE:
            return {
                ...state,
                item: action.item
            }
        default:
            return state
    }
}
