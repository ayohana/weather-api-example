import $ from 'jquery';
import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonifiedResponse) {
        getElements(jsonifiedResponse);
      });

    const getElements = function(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }
  });
});