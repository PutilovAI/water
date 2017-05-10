//Тормозилка для запросов к серверу
export function throttle(func, ms){
    var timer = '';
    var self = this;

    function wrapper(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(self, arguments)
        }, ms)
    }

    return wrapper
}
