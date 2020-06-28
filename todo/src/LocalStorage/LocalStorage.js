
export function getData(key){
    try{
      let data = localStorage.getItem(key)  
      data  = JSON.parse(data)
      return data

    }
    catch{
      return undefined
    }
}

export function saveData(key,data){
   localStorage.setItem(key,JSON.stringify(data))
}