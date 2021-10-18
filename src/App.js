import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';


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

  const handleRegistration = (event) => {
    console.log("Added")

    event.preventDefault();
  }
  return (
    <div className="App">
      <form onSubmit={handleRegistration}>

        <h3>Please Register</h3>
        <label htmlFor="Email">Email:</label>
        <input type="text" name="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="" />
        <br />
        <input type="submit" value="Register" />
      </form>
      <div>------------------------------</div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>

    </div>
  );
}

export default App;
