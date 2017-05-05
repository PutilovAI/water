import * as C from '../constants/Add'

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function postForm(formBody){
    return function(dispatch){
        return fetch(`${C.SERVER_URL}/sources/`,
            {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(formBody),
                credentials: 'include'
            })
            .then(responce => {
                console.dir(responce)
                //responce.json()
            })
            // .then(data => {
            //     dispatch(receivedSource(data));
            // })
    }
}
export function updateForm(form){
    return {
        type : C.UPDATE_FORM,
        form: form
    }
}
