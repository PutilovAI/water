export function receivedSource(item){
    return {
        type: "RECEIVED_SOURCE",
        item: item
    }
}
export function fetchItem(id){
    return function(dispatch){
        return fetch(`/static/data/sources.json`)
            .then(responce => responce.json())
            .then(json => {
                console.log(json)
            })
    }
}
