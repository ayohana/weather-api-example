import $ from 'jquery';
import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    function weatherCall() {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.weatherKey}`;

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    function giphyCall(humidity) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `http://api.giphy.com/v1/gifs/search?q=${humidity}&api_key=${process.env.giphyKey}&limit=5`;

        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();
      });
    }

    weatherCall()
    .then(function(response) {
      let body = JSON.parse(response);
      let humidity = body.main.humidity;
      return giphyCall(humidity);
    })
    .then(function(response) {
      let giphyResponse = JSON.parse(response);
      let image = giphyResponse["data"][0]["images"]["downsized"]["url"];
      $(".showImage").html(`<img src ='${image}'>`);
    });
  });
});