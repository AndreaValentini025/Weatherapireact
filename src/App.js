import React, { Component } from 'react';
import './App.css';

class App extends Component {

constructor(props){
  super(props);
  

  this.state={
    input:'',
    inputCountry:'',
    city:'',
    country:'',
    temp:0,
    pressure:0,
    wind:0,
    weather:'',
    humidity:0,
    image:'',
    image_url:'',
    error:false
  }

}
//https://openweathermap.org/img/w/{this.state.icon}.png
getWeather = async(e) => {
  e.preventDefault();
  const key="df496e977a8eaf0022cfe8705b872eb3";
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input},${this.state.inputCountry}&units=metric&appid=${key}`;
  const api_call= await fetch(url);
  const data = await api_call.json();
  console.log(data);
  this.setState({input:'',inputCountry:''});
  if(data.name){
    this.setState({city:data.name,
    country:data.sys.country,
    temp:data.main.temp,
    pressure:data.main.pressure,
    humidity:data.main.humidity,
    wind:data.wind.speed,
    weather:data.weather[0].description,
    image:data.weather[0].icon,
    image_url:"https://openweathermap.org/img/w/"+data.weather[0].icon+".png"

  });
    document.getElementsByClassName("output")[0].style.visibility="visible";
  }
  else
    this.state.error=true;
}
  



onChange = (event) => {
    this.setState({ input: event.target.value });
    
  }
  onChange2 = (event) => {
    this.setState({ inputCountry: event.target.value }); 
  }

  render() {
    return (
      <div id="main">
        <div className="input">
          <form>
            <p id="title">Weather Forecast</p>
            <br/>
            <p  id="label">Insert city and state </p>
            <input id="city" type="text" value={this.state.input} name="Inserisci la località" onChange={this.onChange}/>
            <input id="country" type="text" value={this.state.inputCountry} name="Inserisci lo stato" onChange={this.onChange2}/>
            <button id="submit" type="submit" onClick={this.getWeather}>Submit</button>
          </form>
        </div>
        <div className="output">
          <h1>{this.state.city},{this.state.country}</h1>
          <img style={{float:"left"}} id="meteo" src={this.state.image_url}/>
          <h3 >{this.state.temp} °C</h3>
          <br/>
          <p style={{textTransform:"uppercase",fontWeight:"bold"}}>{this.state.weather}</p>
          <p><b>Wind</b>: {this.state.wind} m/s</p>
          <p><b>Pressure</b>: {this.state.pressure} HPA</p>
          <p><b>Humidity</b>: {this.state.humidity} %</p>


        </div>
      </div>
    );
  }
}

export default App;
