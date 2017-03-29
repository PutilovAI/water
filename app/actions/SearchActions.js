export function searchFiltering(filter){
    return {
        type: 'SEARCH_FILTER',
        searchFilter: filter
    }
}
export function offersFiltering(val){
    return {
        type: 'OFFERS_FILTER',
        value: val
    }
}
