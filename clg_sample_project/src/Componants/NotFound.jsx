import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Oops! Page Not Found</h1>
      <p style={styles.text}>It seems like you’re trying to reach a page that doesn’t exist.</p>
      
      <img 
        src="https://media.giphy.com/media/26gJRFfgzCJpP3otW/giphy.gif" 
        alt="Page Not Found" 
        style={styles.gif} 
      />

      <p style={styles.suggestion}>Maybe try going back to the homepage?</p>
      <button onClick={() => window.location.href = '/'} style={styles.button}>Go Home</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: '#ff6347',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
  },
  gif: {
    marginTop: '20px',
    width: '300px',
    height: 'auto',
    borderRadius: '10px',
  },
  suggestion: {
    fontSize: '1.1rem',
    marginTop: '20px',
  },
  button: {
    marginTop: '30px',
    padding: '10px 20px',
    fontSize: '1.1rem',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}

export default NotFound;