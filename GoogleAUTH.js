// *IN MAIN JSX
import { GoogleOAuthProvider } from '@react-oauth/google'
<GoogleOAuthProvider clientId='1097136097584-gjpjibr99lc3d50u13mjl18vr9n618gm.apps.googleusercontent.com'>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
</GoogleOAuthProvider>
//* ===================================================


// *IN GoogleAUTH JSX
import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleAUTH() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });


  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className='container'>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div className='form-control'>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button className='btn btn-danger' onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button className='btn btn-primary' onClick={() => login()}><i className="bi bi-google"></i> Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default GoogleAUTH
//* ===================================================

//* IN APP JSX
import GoogleAUTH from '../googleAUTH'
// <Route path='auth' element={<GoogleAUTH />} />