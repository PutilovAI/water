import {
    SERVER_URL,
    GET_FILTER_INIT

} from '../constants/Search'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()
let dcopy =  require('deep-copy')

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
export function offersFiltering(filter){
    return {
        type: 'OFFERS_FILTER',
        offersFilter: filter
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
function filterToStr(filter){
    filter = dcopy(filter);
    var str = '?',
        searchFilter = filter.searchFilter,
        offersFilter = filter.offersFilter,
        sortOrder = offersFilter.order == 'decrement' ?  '-' : '';

    str += `${sortOrder}${offersFilter.value}&`;

    for (let key in searchFilter.checkboxes){
        let cxb = searchFilter.checkboxes[key]

        if (typeof cxb == 'object'){
            for (let keyInner in cxb){
                if (searchFilter.checkboxes[key][keyInner] == true)
                    str += `${key}=${keyInner}&`
            }
        } else {
            if (searchFilter.checkboxes[key] == true)
                str += `${key}=true&`
        }
    }

    for (let key in searchFilter.ranges){
        let range = searchFilter.ranges[key];
        str += `${key}_min=${range.value[0]}&${key}_max=${range.value[1]}&`
    }


    str = str.replace(/\&$/g, '')
    return str;
}
export function fetchSearchResults(filter){
    console.log('fetchSearchResults')

    var getFilter = '';

    if (typeof filter == 'string'){
        getFilter = filter
    } else {
        getFilter = filterToStr(filter);
    }

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
                // if (typeof filter !== 'string')
                //     history.push(getFilter, {filter: filter});
                // else
                //     history.push(getFilter);

                dispatch( recievedSearchResult(data) )
            })
    }
}

export function fetchSearchFilterLimits(filter, cb_success){
    console.log('fetchSearchFilterLimits')
    filter = dcopy(filter);

    return function(dispatch){
        return fetch(`${GET_FILTER_INIT}`,
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
                var limits = {},
                    newFilter = {},
                    searchFilter = filter.searchFilter,
                    offersFilter = filter.offersFilter;

                for (let key in data){
                    let name = key.match(/(.+)__/i);
                    let min = 0
                    let max = 0

                    if(name){
                        name = name[1]
                        if (!limits[name])
                            limits[name] = {min, max};

                        min = data[name+'__min']
                        max = data[name+'__max']
                        if (min)
                            limits[name].min = parseInt(min)
                        if (max)
                            limits[name].max = parseInt(max)
                    }

                }

                for (let key in searchFilter.ranges){

                    let max = limits[key].max,
                        min = limits[key].min,
                        rangeValMin = searchFilter.ranges[key].value[0],
                        rangeValMax = searchFilter.ranges[key].value[1];

                    if (min !== undefined){
                        searchFilter.ranges[key].limit[0] = min

                        if(rangeValMin == undefined || rangeValMin < min){
                            searchFilter.ranges[key].value[0] = min
                        }
                    }
                    rangeValMin = searchFilter.ranges[key].value[0]

                    if (max !== undefined){
                        searchFilter.ranges[key].limit[1] = max

                        if (rangeValMax !== undefined){
                            if (rangeValMax <= rangeValMin){
                                searchFilter.ranges[key].value[1] = rangeValMin
                            }
                            if (searchFilter.ranges[key].value[1] > max){
                                searchFilter.ranges[key].value[1] = max
                            }
                        } else {
                            searchFilter.ranges[key].value[1] = max
                        }
                    }
                }

                newFilter = {
                    searchFilter: searchFilter,
                    offersFilter: offersFilter
                }

                dispatch( searchFiltering(searchFilter) )
                cb_success(newFilter)
            })
    }
}
