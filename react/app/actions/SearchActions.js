import {
    SERVER_URL

} from '../constants/Search'

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

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
export function offersSorting(e){
    return {
        type: 'OFFERS_SORT'
    }
}
export function recievedSearchResult(results){
    return {
        type: 'RECEIVED_SEARCH_RESULTS',
        results: results
    }
}

export function fetchSearchResults(filter){
    return function(dispatch){
        return fetch(`${SERVER_URL}/sources/`,
            {
                method: 'get',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include'
            })
            .then(responce => responce.json())
            .then(data => {
                console.log(data)
                dispatch( recievedSearchResult(data) )
            })
    }
}
