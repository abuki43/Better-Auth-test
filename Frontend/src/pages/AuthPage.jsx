import React, { useState } from "react";
import { authClient } from "../lib/auth-client";
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values: ", email, password);

    const { data, error } = await authClient[isSignIn?"signIn":"signUp"].email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          console.log("Loading", ctx);
        },
        onSuccess: (ctx) => {
          navigate("/dashboard")
          console.log("success ctx: ",ctx)
        },
        onError: (ctx) => {
          console.log("Error:", ctx.error);
        },
      }
    );

    if (data) {
      console.log(`Response: ${JSON.stringify(data)}`);
    } else {
      console.log(`Error response: ${error}`);
    }
  };

  const handleGoogle = async ()=>{
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL:"http://localhost:5173/dashboard",
      errorCallbackURL: "http://localhost:5173/"
      
  })
  }

  return (
    <div className="auth-container" style={styles.container}>
    <div style={styles.card}>
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            backgroundColor: isSignIn ? '#646cff' : 'transparent',
            color: isSignIn ? 'white' : 'black',
          }}
          onClick={() => setIsSignIn(true)}
        >
          Sign In
        </button>
        <button
          style={{
            ...styles.tab,
            backgroundColor: !isSignIn ? '#646cff' : 'transparent',
            color: !isSignIn ? 'white' : 'black',
          }}
          onClick={() => setIsSignIn(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>

        {isSignIn && (
          <button
            type="button"
            onClick={handleGoogle}
            style={styles.googleButton}
          >
            <FcGoogle size={20} style={{ marginRight: '10px' }} />
            Sign in with Google
          </button>
        )}
      </form>
    </div>
  </div>
);
}

const styles = {
container: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
},
card: {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
},
tabs: {
  display: 'flex',
  marginBottom: '20px',
  gap: '10px',
},
tab: {
  flex: 1,
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
},
form: {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
},
input: {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '16px',
},
button: {
  padding: '10px',
  backgroundColor: '#646cff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
},
googleButton: {
  padding: '10px',
  backgroundColor: 'white',
  color:"black",
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
};
export default SignIn;