import logo from './logo.svg';
import './App.css';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword , sendEmailVerification ,sendPasswordResetEmail,updateProfile } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';


initializeAuthentication();
// const provider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();

  // const handleGoogleSignIn = () => {

  //   signInWithPopup(auth, provider)
  //     .then(result => {
  //       const user = result.user;
  //       console.log(user);
  //     })

  // }

  const [name , setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);




//taking input from checkbox (true or false)
  const toggleIsLogin = (event) => {
    setIsLogin(event.target.checked)
  }

//taking name from name field
const handleName = (event) => {
  setName(event.target.value)
}

  // taking input from email field
  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  //taking input from password field
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }


  // form validation
  const handleRegistration = (event) => {
    event.preventDefault();
    //   if(password.length < 6) {
    // setError('password must be 6 characters long');
    // return; 
    // }

    // password validation
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError('password must be Minimum eight characters, at least one letter and one number');
      return;
    }

    isLogin ? loginUser(email, password) : registerNewUser(email, password)


  }



  //First User creation
  const registerNewUser = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
        setError('');
       

        // second email verification whether it is a valid email address or not 
        verifyEmail();
        // store the name into firebase during registration and display that name after login from firebase  
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })


  }

// third  login user
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user)
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })


  }

// send a mail to a valid email address
const verifyEmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(result =>{
    console.log(result)
  })

} 

const setUserName = () =>{
updateProfile ( auth.currentUser , { displayName : name})
.then( result => {})
}

const handleResetPassword = () =>{
  sendPasswordResetEmail(auth, email)
  .then(result =>{

  })
  alert("Your Password Reset option has been sent to your mail")
}

  return (
    <div className="mx-5 mt-5 w-50">
      <h3 className="text-primary mb-5">PLease {isLogin ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleRegistration}>
      {/* name field will be visible only in registration */}
      { !isLogin && <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="name" onBlur={handleName} className="form-control" id="name" required />
          </div>
        </div> }


        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" onBlur={handleEmail} className="form-control" id="inputEmail3" required />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePassword} className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleIsLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered ?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger"> {error}</div>
        <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button> 
        <button type="button" onClick={handleResetPassword} className="btn btn-primary btn-sm mx-5">Reset Password</button>
      </form>
    </div>
  );
}

export default App;
