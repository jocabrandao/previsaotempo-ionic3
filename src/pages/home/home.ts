import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:{
    location:{
      city:string
    },
    clime:{
      main:string,
      description:string,
      iconUrl:string
    },
    temperature:{
      humidity:string,
      pressure:string
      temp:string,
      temp_max:string,
      temp_min:string
    },
    wind:{
      speed:string,
      deg:string
    }
  };
  location:{
    city:string
  };

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage:Storage) {

  }

  ionViewWillEnter(){
   
    this.storage.get('location').then((val) => {
      
      if(val != null)  {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Lisbon'
        }
      }

      this.weatherProvider.getWeather(this.location.city).subscribe(currentWeather => {

        console.log(currentWeather);
    
    
        this.weather = {
          location:{
            city:this.location.city
          },
          clime:{
            main:currentWeather.weather[0].main,
            description:currentWeather.weather[0].description,
            iconUrl:this.weatherProvider.getWeatherUrlIcon(currentWeather.weather[0].icon)
          },
          temperature:{
            humidity:currentWeather.main.humidity,
            pressure:currentWeather.main.pressure,
            temp:currentWeather.main.temp,
            temp_max:currentWeather.main.temp_min,
            temp_min:currentWeather.main.temp_max
          },
          wind:{
            speed:currentWeather.wind.speed,
            deg:currentWeather.wind.deg
          }
        };
    
          // console.log(this.weather.location);
          // console.log(this.weather.clime);
          // console.log(this.weather.temperature);
          // console.log(this.weather.wind);
   
       });
    });
  }
}
