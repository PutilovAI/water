export function receivedSource(item){
    return {
        type: "RECEIVED_SOURCE",
        item: item
    }
}
export function fetchItem(id){
    return function(dispatch){
        return fetch(`/dist/static/data/sources.json`)
            .then(responce => responce.json())
            .then(data => {

                data.items.forEach( item =>{
                    if (item.id == id){
                        dispatch(receivedSource(item));
                        return false;
                    }
                })
            })
    }
}
