import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Meetings from './Meetings';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    }
  }

  componentDidMount() {
    const ref = firebase.database().ref('user');
    ref.on('value', snapshot => {
      let FBUser = snapshot.val();
      this.setState({ user: FBUser });
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      })
    })
  }

  // componentDidMount() {
  //   const ref = firebase.database().ref('user');
  //   ref.on('value', snapshot => {
  //     let FBUser = snapshot.val();
  //     console.log('FBUser: ', FBUser);
  //     this.setState({ user: FBUser });
  //   });

    // Result: FBUser: "Bob"
    // https://firebase.google.com/docs/database/web/read-and-write
    // var userId = firebase.auth().currentUser.uid;
    // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      //   console.log(username);
      // });

    // return firebase.database().ref('/user')
    //   .once('value')
    //   .then(function(snapshot) {
    //     console.log(snapshot.val());
    // });
    // Result: 'Bob'

    // const database = firebase.database().ref('/user')
    //   .once('value')
    //   .then(function(snapshot) {
    //     console.log(snapshot.val());
    //     console.log('database: ', database);
    // });
    // Result: 'Bob' (takes a minute)
    // Result: Promise {status: "pending"}

    // const ref = firebase.database().ref('user');
    // ref.on('value', function(snapshot) {
    //   let FBUser = snapshot.val();
    //   console.log('FBUser: ', FBUser);
    //   this.setState({ user: FBUser });
    // });
    // FBUser: "Bob"
    // Result: TypeError: null is not an object (evaluating 'this.setState')
  // }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && <Welcome user={this.state.displayName} />}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    )
  }
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
