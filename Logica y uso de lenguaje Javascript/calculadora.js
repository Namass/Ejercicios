calculadora('4-7+8+9/2*3');

function calculadora(data){
    //recibe la cadena en forma de string y lo convierte en array
    if(typeof data == 'string'){
        //remueve las , y las letras
        data = data.replace(/[a-zA-Z,]/gi,'');
        //longitud maxima de 20 caracteres
        if(data.length > 20){
            console.log('error, la cadena debe ser menor a 20');
            return;
        }
        //convierte el string en array manteniendo los simbolos
        data = data.split(/([+\-*/^()])/);
    }
    //si contiene parentesis, se resuelve primero lo que hay dentro
    if(data.includes('(')){
        for (const key in data) {
            let key1 = parseInt(key)
            if(data[key] == '('){
                //recorre la cadena para encontrar donde cierra el parentesis
                for(i=key;i<=data.length;i++){
                    if(data[i] == ')'){
                        aux = data.slice(key1+1, i);
                        //devuelve lo que hay dentro a la funcion para obtener la operacion
                        result = calculadora(aux);
                        //se vuelve a crear el string con el resultado
                        data = data.slice(0, key) + result + data.slice(i+1);
                        //se vuelve a crear el array
                        data = data.replace(/[a-zA-Z,]/gi,'');
                        if(data.length > 20){
                            console.log('error, la cadena debe ser menor a 20');
                            return;
                        }
                        data = data.split(/([+\-*/^()])/);
                    }
                }
            }
        }
    }
    //si contiene potencia, se resuelve primero lo potencia
    if(data.includes('^')){
        for (const key in data) {
            let key1 = parseInt(key)
            if(data[key] == '^'){
                if(data[key] == '^'){
                    potencia = parseFloat(data[key1-1]);
                    for(i=1;i<parseFloat(data[key1+1]);i++){
                        potencia *= parseFloat(data[key1-1]);
                    }
                }
                result = data.slice(0, key1-1) + potencia + data.slice(key1+2);
                result = calculadora(result);
                return result;
            }
        }
    }
    //si contiene multiplicacion o division, se resuelven las operaciones primero desde la izquierda
    if(data.includes('*') || data.includes('/')){
        for (const key in data) {
            let key1 = parseInt(key)
            if(data[key] == '*' || data[key] == '/'){
                if(data[key] == '*'){
                    aux = parseFloat(data[key1-1]) * parseFloat(data[key1+1]);
                }else{
                    aux = parseFloat(data[key1-1]) / parseFloat(data[key1+1]);
                }
                result = data.slice(0, key1-1) + aux + data.slice(key1+2);
                result = calculadora(result);
                return result;
            }
        }
    }
    //si contiene suma o resta, se resuelven las operaciones primero desde la izquierda
    if(data.includes('+') || data.includes('-')){
        for (const key in data) {
            let key1 = parseInt(key)
            if(data[key] == '+' || data[key] == '-'){
                if(data[key] == '+'){
                    aux = parseFloat(data[key1-1]) + parseFloat(data[key1+1]);
                }else{
                    //si la operacion empieza con un negativo se maneja el valor negativo
                    if(isNaN(parseFloat(data[key1-1]))){
                        key1 +=2;
                        if(data[key1] == '+'){
                            aux = -parseFloat(data[key1-1]) + parseFloat(data[key1+1]);
                        }else{
                            aux = -parseFloat(data[key1-1]) - parseFloat(data[key1+1]);
                        }
                        result = aux + data.slice(key1+2);
                        result = calculadora(result);
                        return result;
                    }else{
                        aux = parseFloat(data[key1-1]) - parseFloat(data[key1+1]);
                    }
                }
                result = data.slice(0, key1-1) + aux + data.slice(key1+2);
                result = calculadora(result);
                return result;
            }
        }
    }
    //regresa el resultado de la operacion
    console.log(data);
    return data;
}