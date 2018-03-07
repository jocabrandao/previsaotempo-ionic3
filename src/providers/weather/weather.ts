import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  apiKey = 'e2cb3f7e4d4bb27d57e4bede0cb899e4';
  url;
  urlIcon;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + this.apiKey + '&q=';
    this.urlIcon = 'http://openweathermap.org/img/w/';
  }

  getWeather(city) {
    return this.http.get(this.url + city)
      .map(res => res.json());
  }

  getWeatherUrlIcon(iconID) {
    return this.urlIcon + iconID + '.png';
  }

}
