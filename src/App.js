import React, { Component } from 'react';


import './App.css';



class App extends Component {

  state = {
      nom : '',
      fichier : '',
      du: 0

  };





    onChange = (e) => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);

  }


   /* getDuration = (f) =>
    {
        var d=0;
        var video = document.createElement('video');


        video.src = URL.createObjectURL(f);

        video.onloadedmetadata = () => {

            d=video.duration;
            const state = this.state;
            state.du = d;
            this.setState(state);
            console.log(this.state.du);

        }


       // console.log(d);

    }*/

    /*changeDu = (d)=> {
        const state = this.state;
        state.du = d;
        this.setState(state);
        console.log(this.state.du);
        }*/




  onSubmit = (e) => {
      e.preventDefault();
      console.log("hi");
      const { nom, fichier} = this.state;
      console.log(nom + fichier);
      var f = this.uploadInput.files[0];
      var fsize = f.size;
      console.log(fsize);



      var d=0;
      var video = document.createElement('video');


      video.src = URL.createObjectURL(f);

      video.onloadedmetadata = () => {

          d=video.duration;
          const state = this.state;
          state.du = d;
          this.setState(state);
          console.log(this.state.du);

      }



      video.oncanplaythrough = () =>

      {
          if ((this.state.du<=60) && (fsize<= 50000000))
          {

              const data = new FormData();
              data.append('file', this.uploadInput.files[0]);
              data.append('filename', this.fileName.value);

              console.log(this.state.du);




              //console.log(this.state.du),
              fetch('http://localhost:8000/upload', {
                  method: 'POST',
                  body: data,
              }).then((respnse) => {
                  respnse.json().then((body) => {
                      this.setState({fichier: `http://localhost:8000/${body.file}`})
                  });
              })
          }

          else
          {
              alert("video is not according to criteria");
          }


  }




      }




  render() {
    return (
      <div className="App" id="app">
        <header className="App-header">

          <h1 className="App-title">Welcome </h1>
        </header>

        <form onSubmit={this.onSubmit}>
            <input type="text" name="nom" ref={(ref)=>{this.fileName = ref}} onChange={this.onChange}/>
            <input type="file" name="fichier" accept="video/*" ref={(ref)=>{this.uploadInput = ref}} onChange={this.onChange}/>
            <button type="submit">Confirmer</button>


        </form>






      </div>
    );
  }





}

export default App;
