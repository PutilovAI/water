import * as c from '../constants/Source'

export function receivedSource(item){
    return {
        type: c.RECEIVED_SOURCE,
        item: item
    }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function fetchItem(id){
    return function(dispatch){
        return fetch(`${c.SERVER_URL}/sources/${id}/`,
            {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include'
            })
            .then(responce => {
                return responce.json().then(json => ({ data: json, status: responce.status}) )
            })
            .then( ({data, status}) => {
                if (status == 200){
                    dispatch({
                        type: c.FETCH_SOURCE_SUCCESS
                    })
                    dispatch(receivedSource(data));
                } else {
                    dispatch({
                        type: c.FETCH_SOURCE_FAIL
                    })
                }

            })
            .catch(error => {
                dispatch({
                    type: c.FETCH_SOURCE_FAIL
                })
            })

    }
}
