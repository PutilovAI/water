const initialState = {
    offersFilter: {
        value: 'distance',
        order: 'increment'
    },
    searchFilter: {
        checkboxes: {
            type: {
                rodnik: true,
                kolonka: false,
            },
            analiz: false
        },
        ranges: {
            distance: {
                limit: [0, 3000],
                value: [0, 2000]
            },
            rating: {
                limit: [0, 10],
                value: [3, 8]
            },
            pressure: {
                limit: [0, 30],
                value: [5, 30]
            },
            waiting: {
                limit: [0, 60],
                value: [0, 5]
            },
        }
    },
    searchResults: [
        {
            id: '1',
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
        {
            id: '2',
            title: "Водоканал",
            type: 'kolonka',
            typeText: "Колонка",
            distance: "110",
            pressure: "8",
            rating: "5.0",
            visitors: "1856",
            img: '/dist/static/img/offer-card-2.jpg'
        },
        {
            id: '3',
            title: "По щучьему веленью",
            type: 'rodnik',
            typeText: "Родник",
            distance: "80",
            pressure: "12",
            rating: "8.5",
            visitors: "23",
            img: '/dist/static/img/offer-card-3.jpg'
        },
        {
            id: '4',
            title: "Речка вонючка",
            type: 'kolonka',
            typeText: "Колонка",
            distance: "60",
            pressure: "18",
            rating: "2.0",
            visitors: "564",
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
                    ...state.offersFilter,
                    value: action.value
                }
            }
        case 'OFFERS_SORT':
            return {
                ...state,

                offersFilter: {
                    ...state.offersFilter,
                    order: (state.offersFilter.order == 'increment') ? 'decrement' : 'increment'
                }
            }
        default:
            return state
    }
}
