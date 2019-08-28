import $ from 'jquery'

export default {

    data () {
        return {
            //
        }
    },

    methods: {

        getRecord(recordtype, param, callback) {
            if(recordtype === 'parent') {
                $.ajax({ //send a request to check how many children a category has
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/categories/?parent=' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                 
                        callback(response);
                        return false;
                    }                
                });                 
            } else if (recordtype === 'slug') {
                $.ajax({ //send a request to check if a country/state already exists..
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/categories/?slug=' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                   
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'id') {
                $.ajax({ //get data by Cat ID
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/categories/' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                   
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'posts') {
                $.ajax({ //send a request to check how many posts the category has..
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/posts/?categories=' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                  
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'search-zip') {
                $.ajax({ //find the same cities
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/posts/?search=' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                  
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'state-data') {
                $.ajax({ //get a data from a state
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/categories/' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                  
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'find-post') {
                $.ajax({ //find a user's post
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/posts/' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                  
                        callback(response);
                        return false;
                    }                
                });
            } else if (recordtype === 'find-zip') {
                $.ajax({ 
                    method: 'GET',
                    url: process.env.API_URL + '/wp-json/wp/v2/zipcodes/?search=' + param,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                    },
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                  
                        callback(response);
                        return false;
                    }                
                });
            }                
        },

        updateAddressFields(id, token, rate, callback) {
            $.ajax({ 
                method: 'PUT',
                url: process.env.API_URL + '/wp-json/wp/v2/posts/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer '+ token
                },
                beforeSend: function ( xhr ) {
                    xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                },  
                data:JSON.stringify({
                    meta: {
                        City: rate
                    }                         
                }),                 
                success:function (response) {
                    callback(response);
                },
                error:function (response) {                 
                    callback(response);
                    return false;
                }                
            });          
        },         

        updatePost(id, token, rate, callback) {
            $.ajax({ 
                method: 'PUT',
                url: process.env.API_URL + '/wp-json/wp/v2/posts/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer '+ token
                },
                beforeSend: function ( xhr ) {
                    xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                },  
                data:JSON.stringify({
                    content: rate,                         
                }),                 
                success:function (response) {
                    callback(response);
                },
                error:function (response) {                 
                    callback(response);
                    return false;
                }                
            });          
        },        

        updateRecord(id, token, rate, callback) {
            $.ajax({ //send a request to check if a country/state already exists..
                method: 'PUT',
                url: process.env.API_URL + '/wp-json/wp/v2/categories/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer '+ token
                },
                beforeSend: function ( xhr ) {
                    xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                },  
                data:JSON.stringify({
                    description: rate,                         
                }),                 
                success:function (response) {
                    callback(response);
                },
                error:function (response) {                 
                    callback(response);
                    return false;
                }                
            });          
        },

        createRecord(recordtype, token, data, callback) {
            if(recordtype === 'categories') {
                $.ajax({
                    method: 'POST',
                    url: process.env.API_URL + '/wp-json/wp/v2/' + recordtype,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Bearer '+ token
                    },
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                    },                     
                    data: data,
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                    
                        callback(response);
                        return false;
                    }                                           
                });
            } else if(recordtype === 'posts') {
                $.ajax({
                    method: 'POST',
                    url: process.env.API_URL + '/wp-json/wp/v2/' + recordtype,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Bearer '+ token
                    },
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                    },                     
                    data: data,
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                    
                        callback(response);
                        return false;
                    }                                        
                });
            } else if(recordtype === 'userreqs') {
                $.ajax({
                    method: 'POST',
                    url: process.env.API_URL + '/wp-json/wp/v2/' + recordtype,
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': 'Bearer '+ token
                    },
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' );
                    },                     
                    data: data,
                    success:function (response) {
                        callback(response);
                    },
                    error:function (response) {                    
                        callback(response);
                        return false;
                    }                                        
                });
            }
        },

        getSlug: function(lat, lng, callback) {
            $.ajax({
                method: 'GET',
                url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&addressdetails=1',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                success:function (response) {
                    callback(response);  
                },
                error:function (response) {                  
                    callback(response);
                    return false;
                }  
            });                
        }, 

        nonLatinCheck: function(locality, callback) {
            var foreignCharacters = locality,
                foreignSymbolsCheck = /[^\u0000-\u007f]/,
                response;
            if (foreignSymbolsCheck.test(foreignCharacters)) {
                response = 'yes';
            } else {
                response = 'no';
            }
            callback(response);
        },
        
    },

}