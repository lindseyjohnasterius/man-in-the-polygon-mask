/*
  *** BEGIN ASCII ART ***
        ___       __   ___  __   __
  |__| |__  |    |__) |__  |__) /__`
  |  | |___ |___ |    |___ |  \ .__/

  *** END ASCII ART ***
  
  "Look for the Helpers" -- Mr. Rogers
*/


/*
  
  Get the hashbang values from a URL

*/

export function getURLValues(URL = window.location.href ){
  const search_params = new URLSearchParams(URL)
  let options = {}
  for (const [key, unparsed_value] of search_params) {
    if(key !== window.location.origin + window.location.pathname + '?' ){
      try {
        const value = JSON.parse(decodeURI(unparsed_value))
        options[key] = value
      } catch {
        options[key] = decodeURI(unparsed_value)
      }
    }
  }
  return options
}


/*
  
  Set's the URL's hashbang values from an Object

*/

let page_counter = 0

export function setURLValues(obj){
  page_counter++
  let url = window.location.origin + window.location.pathname + '?'
  Object.keys(obj).forEach(key => {
    let encodedvalue = encodeURI(obj[key])
    url += `&${key}=${encodedvalue}`
  })
  history.pushState({}, page_counter, url)
}


export function ready(callbackFunction){
  if(document.readyState === 'complete')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

/*

  Standard debounce function

*/
export const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

/*

  Random Gnar Char Generator

*/

export function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}