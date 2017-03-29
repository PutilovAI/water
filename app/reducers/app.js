const initialState = {
    offersFilter: {
        value: 'distance'
    },
    searchFilter: {
        rodnik: true,
        kolonka: true
    },
    searchResults: [
        {
            id: 'water_source_1',
            title: "Моя водичка на дровах возле хутора близ Диканьки",
            address: "Сверд. обл., Камышловский р-н, д. Бабайка, ул. Советская, 15",
            type: "rodnik",
            distance: "100",
            pressure: "10",
            rating: "6.7",
            img: '/dist/static/img/offer-card-1.jpg'
        },
        {
            id: 'water_source_2',
            title: "Водоканал",
            type: "kolonka",
            distance: "110",
            pressure: "8",
            rating: "5.0",
            img: '/dist/static/img/offer-card-2.jpg'
        },
        {
            id: 'water_source_3',
            title: "По щучьему веленью",
            type: "rodnik",
            distance: "80",
            pressure: "12",
            rating: "8.5",
            img: '/dist/static/img/offer-card-3.jpg'
        },
        {
            id: 'water_source_4',
            title: "Речка вонючка",
            type: "kolonka",
            distance: "60",
            pressure: "18",
            rating: "2.0",
            img: '/dist/static/img/offer-card-4.jpg'
        }
    ]
}

export default function app(state = initialState, action){
    switch(action.type) {
        case 'SEARCH_FILTER':
            return {
                ...state,
                searchFilter: action.searchFilter
            }
        case 'OFFERS_FILTER':
            return {
                ...state,
                offersFilter: {
                    value: action.value
                }
            }
        default:
            return state
    }
}
