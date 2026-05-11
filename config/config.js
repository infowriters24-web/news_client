const production  = 'production'
const development = 'development'
const mode =  development
let base_url = ''
const api_url = "http://localhost:4000"
const production_api_url = "http://localhost:4000"

if(mode === production){
    base_url = production_api_url
}else{
    base_url = api_url
}

export { base_url }