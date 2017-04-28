import {
    SERVER_URL

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
function filterToStr(filter){
    var str = '?';

    for (let key in filter.checkboxes){
        let cxb = filter.checkboxes[key]

        if (typeof cxb == 'object'){
            for (let keyInner in cxb){
                if (filter.checkboxes[key][keyInner] == true)
                    str += `${key}=${keyInner}&`
            }
        } else {
            if (filter.checkboxes[key] == true)
                str += `${key}=true&`
        }
    }

    for (let key in filter.ranges){
        let range = filter.ranges[key];
        str += `${key}_min=${range.value[0]}&${key}_max=${range.value[1]}&`
    }

    str = str.replace(/\&$/g, '')
    return str;
}
export function fetchSearchResults(filter){

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
                if (typeof filter !== 'string')
                    history.push(getFilter, {filter: filter});
                else
                    history.push(getFilter);

                dispatch( recievedSearchResult(data) )
            })
    }
}

export function fetchSearchFilterLimits(filter, cb_success){
    filter = dcopy(filter);

    return function(dispatch){
        return fetch(`${SERVER_URL}/test/`,
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
                var limits = {}

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

                for (let key in filter.ranges){

                    let max = limits[key].max
                    let min = limits[key].min

                    if (min !== undefined){
                        filter.ranges[key].limit[0] = min

                        if(filter.ranges[key].value[0] == undefined || filter.ranges[key].value[0] < min){
                            filter.ranges[key].value[0] = min
                        }
                    }

                    if (max !== undefined){
                        filter.ranges[key].limit[1] = max
                        if (filter.ranges[key].value[1] == undefined || filter.ranges[key].value[1] > max )
                            filter.ranges[key].value[1] = max
                    }
                }

                dispatch( searchFiltering(filter) )
                cb_success(filter)
            })
    }
}
