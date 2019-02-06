import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLink from './components/ImageLink/ImageLink'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Facerecognition from './components/Facerecognition/Facerecognition'
import Score from './components/Score/Score'
import Particles from 'react-particles-js';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ef6c907061df4aa6b2ccab695062308d'
 });


const particleOption = {
  particles: {
    number: {
      value: 250,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input:'',
  imageURL:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
      id:'',
      name:"",
      email:'',
      score:''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState
  }

  Calculate = (data)=>{
    const img = document.getElementById("img");
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      leftCol: data.left_col*width,
      topRow: data.top_row*height,
      rightCol: width - (data.right_col*width),
      bottomRow: height - (data.bottom_row*height)
    }
  }

  setBox=(box)=>{
    this.setState({box:box});
  }

  loadUser = (data) =>{
    this.setState({user:{
      id:data._id,
      name:data.name,
      email:data.email,
      score:data.score,
    }})
    console.log(this.state.user)
  }

  onInputChange = (events) =>{
    this.setState({input:events.target.value});
  }

  onButtonClick = () =>{
    this.setState({imageURL:this.state.input});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",this.state.input).then(
    (response)=> {
      if(response){
        fetch("https://polar-hollows-85842.herokuapp.com/image",{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.state.user.id,
      })
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      this.setState(Object.assign(this.state.user,{score:data}))
    })
      }
      this.setBox(this.Calculate(response.outputs[0].data.regions[0].region_info.bounding_box))
    },
    (err)=> {
      console.log(err)
    }
  );
   /* app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
         this.setBox(this.Calculate(response.outputs[0].data.regions[0].region_info.bounding_box))
      })*/
  }

  changeRoute = (route) =>{
    if(route === 'signout')
      this.setState(initialState)
    else if(route === 'home')
      this.setState({isSignedIn:true})
    this.setState({route:route})
  }

  render() {
    return (
      <div>
        <Particles className="particles" params={particleOption}/>
        <Navigation isSignedIn={this.state.isSignedIn} changeRoute={this.changeRoute}/>
        { this.state.route === 'home' ? <div>
            <Logo />
          <Score name={this.state.user.name} score={this.state.user.score}/>
          <ImageLink onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <Facerecognition box={this.state.box} url={this.state.imageURL}/>
            </div>
            :( 
                this.state.route === 'signin' ? <Signin loadUser={this.loadUser} changeRoute={this.changeRoute} /> : 
                <Register loadUser={this.loadUser} changeRoute={this.changeRoute} /> 
            )
          }
        
      </div>
    );
  }
}

export default App;
