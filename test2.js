import axios from 'axios';

export function actionAddBookmark(job,) {
  
  // URL for wukdo jobs list api. documentation at https://api.dev.wukdo.com/documentation/html/guide-api-category.html
const ADD_FAVORITE_URL = 'https://api.dev.wukdo.com/favorite';
//declaring variables to store jobs array for dispatching to redux reducers
let loginToken;
// checking localstorage for authorization token
let tokenToken = localStorage.getItem("token");
// checking if the token was saved from localstorage, if not it will check session storage
if (!tokenToken) {
  tokenToken = sessionStorage.getItem("token");
}
// If a token is found then it will proceed with the GET request
if (tokenToken) {
// Declaring variable and storing the token in to it.
let loginToken = "Bearer " + tokenToken;
axios.defaults.headers.common['Authorization'] = loginToken;
}
  return function(dispatch,getState){
    console.log(`The job ID that you want to bookmark is ${job.id} and the type is ${job.type.id}`);
    let bookmarkAddPending = getState().jobs.bookmarkAddPending
    bookmarkAddPending[job.id] = true
    dispatch({
      type: "BOOKMARK_ADDING_PENDING",
      payload: bookmarkAddPending
    })
    let form_data = new FormData();
    form_data.append("id",job.id)     // email address
    form_data.append("type", job.type.id) // password
    axios.post(ADD_FAVORITE_URL,form_data)
      .then(function(response){
        if (response.data.success === true) {
          console.log('it works');
        }
    })
      .catch(function (error) {
        if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
              dispatch({
              type: "ERROR_ADDING_BOOKMARK",
              payload: error.response
                 });
    }
  })
    
  }
}