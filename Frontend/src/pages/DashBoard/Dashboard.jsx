import React from 'react'
import { authClient } from '../../lib/auth-client'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const {data,isPending,error,refetch} = authClient.useSession()
    console.log("Data: ",data, "error: ",error)


    const handleSignOut = async ()=>{
        await authClient.signOut();
        navigate("/");
    }
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Dashboard</h2>
        <button onClick={handleSignOut} style={styles.logoutButton}>
          Logout
        </button>
      </nav>
      <main style={styles.main}>
        <h1 style={styles.welcome}>
          Welcome, {data?.user?.name  || 'User'}!
        </h1>
        <p style={styles.message}>
          You have successfully logged into your dashboard.
        </p>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: 0,
    color: '#646cff',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  main: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  welcome: {
    color: '#333',
    marginBottom: '1rem',
  },
  message: {
    color: '#666',
    fontSize: '18px',
  },
};

export default Dashboard;