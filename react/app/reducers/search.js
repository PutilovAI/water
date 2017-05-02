const initialState = {
    filter: {
        options: {
            initialized: false
        },
        offersFilter: {
            value: 'distance',
            order: 'increment'
        },
        searchFilter: {
            checkboxes: {
                type: {
                    rodnik: false,
                    kolonka: false,
                },
                analiz: false
            },
            ranges: {
                distance: {
                    limit: [0,1],
                    value: [0,1]
                },
                rating: {
                    limit: [0,1],
                    value: [0,1]
                },
                pressure: {
                    limit: [0,1],
                    value: [0,1]
                },
                waiting: {
                    limit: [0,1],
                    value: [0,1]
                },
            }
        },
    },

    searchResults: []
}

export default function app(state = initialState, action){
    switch(action.type) {
        case 'SEARCH_FILTER':
            return {
                ...state,
                filter: action.filter
            }
        case 'OFFERS_FILTER':

            return {
                ...state,
                filter: action.filter
            }
        case 'OFFERS_SORT':
            return {
                ...state,
                filter: action.filter
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
