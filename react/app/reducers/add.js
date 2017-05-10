import * as C from '../constants/Add'
const dcopy = require('deep-copy');

const initialState = {
    form: {
        isValid: false,
        fields: {
            latitude: {//широта
                value : ''
            },
            longitude: {//долгота
                value : ''
            },
            address: {
                value : ''
            }
        }
    }
}

export default function app(state = initialState, action){
    switch(action.type) {
        case  C.UPDATE_FORM:
            return {
                ...state,
                form: action.form
            }
        default:
            return state
    }
}
