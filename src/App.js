import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';


initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();
  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })

  }


const [email,setEmail] = useState('') ;
const [password,setPassword] = useState('') ;
const [error,setError] = useState('') ;


  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

 const handleRegistration = (event) => {
  event.preventDefault();
//   if(password.length < 6) {
// setError('password must be 6 characters long');
// return; 
// }
 if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
  setError('password must be Minimum eight characters, at least one letter and one number');
  return; 
 }

    console.log(email,password)
createUserWithEmailAndPassword ( auth , email , password) 
.then(result =>{
  const user = result.user
  console.log(user)
})
.catch(error =>{
  setError(error.message);
})
    
  }
  return (
    <div className="mx-5 mt-5 w-50">
      <form onSubmit={handleRegistration}>

        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" onBlur={handleEmail} className="form-control" id="inputEmail3" required />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" onBlur={handlePassword} className="form-control" id="inputPassword3" required/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <div className = "row mb-3 text-danger"> {error}</div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default App;
