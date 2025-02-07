import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const containerStyle = {
    padding: '20px',
    textAlign: 'center'
  };

  const headerStyle = {
    fontSize: '2rem',
    marginBottom: '20px'
  };

  const paragraphStyle = {
    fontSize: '1.2rem'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg,rgb(71, 194, 255) 0%,rgb(1, 29, 43) 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isHovered ? '0 7px 10px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
  }

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Welcome to the Banking Loan Application</h1>
      <p style={paragraphStyle}>
        Apply for loans easily and get instant approvals. Experience the hassle-free loan process with us.
      </p>
      <p style={paragraphStyle}>
        You can start Video KYC for your registration and start your loan journey process.
      </p>
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate('/kyc')}
      >
        Start KYC Process
      </button>
    </div>
  );
};

export default HomePage;
