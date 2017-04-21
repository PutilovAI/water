import {
    SERVER_URL

} from '../constants/Search'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

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

    var getFilter = '';

    if (typeof filter == 'string'){
        getFilter = filter
    } else {
        for (let key in filter.ranges){
            let range = filter.ranges[key];
            getFilter += `?${key}_min=${range.value[0]}&${key}_max=${range.value[1]}&`
        }
        getFilter = getFilter.replace(/\&$/g, '')
    }
    // console.log(`filter = ${filter}`)
    // console.log(`getFilter = ${getFilter}`)
    // if (typeof filter !== 'String')
    //     history.push(getFilter, {filter: filter});
    // else
    //     history.push(getFilter);

    return function(dispatch){
        return fetch(`${SERVER_URL}/sources/${getFilter}`,
            {
                method: 'get',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-csrftoken': getCookie('csrftoken')
                },
                credentials: 'include'
            })
            .then(responce => responce.json())
            .then(data => {
                //console.log(data)
                // if (typeof filter !== 'String')
                //     history.push(getFilter, {filter: filter});
                // else
                //     history.push(getFilter);
                // console.log('data')
                // console.log(data)
                dispatch( recievedSearchResult(data) )
            })
    }
}
