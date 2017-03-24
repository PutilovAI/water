const initialState = {
    filter: {
        rodnik: true,
        kolonka: false
    },
    searchResults: [
        {
            title: "Моя водичка",
            type: "rodnik"
        },
        {
            title: "Водоканал",
            type: "kolonka"
        },
        {
            title: "По щучьему веленью",
            type: "rodnik"
        },
        {
            title: "Речка вонючка",
            type: "kolonka"
        }
    ]
}

export default function app(state = initialState, action){
    switch(action.type) {
        case 'FILTERING':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state
    }
}
