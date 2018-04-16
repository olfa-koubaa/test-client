import React, { Component } from 'react';

import './App.css';



class App extends Component {

  state = {
      nom : '',
      fichier : ''
  };



  onChange = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
  }


  onSubmit = (e) => {
      e.preventDefault();
      console.log("hi");
      const { nom, fichier} = this.state;
      console.log(nom + fichier);

      const data = new FormData();
      data.append('file',this.uploadInput.files[0]);
      data.append('filename',this.fileName.value);

      fetch('http://localhost:8000/upload',{
          method : 'POST',
          body : data,
      }).then((respnse)=> {
          respnse.json().then((body)=> {
              this.setState({fichier : `http://localhost:8000/${body.file}`})
          });
      });


  }



  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome </h1>
        </header>

        <form onSubmit={this.onSubmit}>
            <input type="text" name="nom" ref={(ref)=>{this.fileName = ref}} onChange={this.onChange}/>
            <input type="file" name="fichier" ref={(ref)=>{this.uploadInput = ref}} onChange={this.onChange}/>
            <button type="submit">Confirmer</button>
        </form>




      </div>
    );
  }





}

export default App;
