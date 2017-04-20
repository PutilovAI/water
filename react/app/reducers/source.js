import {SERVER_URL, RECEIVED_SOURCE} from '../constants/Source'

const initialState = {
    item: {
        id: 'water_source_1',
        title: "Моя водичка на дровах возле хутора близ Диканьки",
        address: "Сверд. обл., Камышловский р-н, д. Бабайка, ул. Советская, 15",
        type: 'rodnik',
        typeText: "Родник",
        analiz: true,
        distance: "100",
        pressure: "10",
        rating: "6.7",
        visitors: "15456",
        img: '/dist/static/img/offer-card-1.jpg'
    },
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
