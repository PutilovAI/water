const initialState = {
    offersFilter: {
        value: 'distance',
        order: 'increment'
    },
    searchFilter: {
        options: {
            initialed: false
        },
        checkboxes: {
            type: {
                rodnik: false,
                kolonka: false,
            },
            analiz: false
        },
        ranges: {
            distance: {
                limit: [0, 3000],
                value: [0, 3000]
            },
            rating: {
                limit: [0, 10],
                value: [0, 10]
            },
            pressure: {
                limit: [0, 30],
                value: [0, 30]
            },
            waiting: {
                limit: [0, 60],
                value: [0, 60]
            },
        }
    },
    searchResults: []
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
        case 'RECEIVED_SEARCH_RESULTS':
            return {
                ...state,

                searchResults: action.results
            }
        default:
            return state
    }
}
