import React from 'react';
import './App.css';
import CounterValue from './component/CounterValue';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      counter: 1,
      inputText: '',
      setTrue: true,
    }
  }

  componentMount(){
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/202011047.json').then(res=>res.json())
    .then(response => {
      console.log(response);
      if(response){
        this.setState({counter:response})
      }
    })
  }

  updateAPI = (counter) => {
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',{
      method:"PUT",
      body:JSON.stringify({'202011047':counter})
    }).then(res=>res.json())
    .then(response=> {
      console.log(response)
      this.setState({setTrue : true});
    })
  }; 

  onChange = (event) => {
    this.setState({setTrue : false});    
    let inputText = event.target.value;
    this.setState({counter: parseInt(inputText) || 1});  
    this.updateAPI(inputText);  
  }

  onIncrease = () => {
    if(this.state.counter < 1000){
      this.setState({setTrue : false});
      let counter = this.state.counter +1;
      this.setState({counter})
      this.updateAPI(counter);
    }
  }

  onDecrease = () => {
    if (this.state.counter > 1){
      this.setState({setTrue : false});
      let counter = this.state.counter -1;
      this.setState({counter})
      this.updateAPI(counter);
    } 
  }

  render() {
    const{setTrue} = this.state;
    return (
      <>
      <div>
      { !setTrue && <div><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Saving Counter Value</div>}
      </div>

      <div className="App">        
        <button id="b1" onClick={this.onDecrease}>-</button>
        <input onChange= {this.onChange} value={this.state.counter}/>
        <button id="b2" onClick={this.onIncrease}>+</button>
        <CounterValue counter ={this.state.counter} />
      </div>
      </>
    )
  }
}

export default App;