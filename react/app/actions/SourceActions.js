import {SERVER_URL, RECEIVED_SOURCE} from '../constants/Source'

export function receivedSource(item){
    return {
        type: RECEIVED_SOURCE,
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
        return fetch(`${SERVER_URL}/sources/${id}/`,
            {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken')
                },
                credentials: 'include'
            })
            .then(responce => responce.json())
            .then(data => {
                dispatch(receivedSource(data));
            })
    }
}
