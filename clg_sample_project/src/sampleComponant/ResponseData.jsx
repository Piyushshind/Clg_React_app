import React from 'react';

const ResponseData = ({ data }) => {
  if (!data) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Processing Result</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Parameter</th>
            <th style={styles.tableHeader}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableData}><strong>Processing Duration:</strong></td>
            <td style={styles.tableData}>{data.processing_time} seconds</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Audio Duration:</strong></td>
            <td style={styles.tableData}>{data.result.audio_result.audioDuration} seconds</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>OTP Number Transcribed:</strong></td>
            <td style={styles.tableData}>{data.result.audio_result.transcribedOTP}</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Actual OTP:</strong></td>
            <td style={styles.tableData}>{data.result.audio_result.actualOTP}</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>OTP Number Verified:</strong></td>
            <td style={styles.tableData}>{data.result.audio_result.numberVerified ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Liveliness Percentage:</strong></td>
            <td style={styles.tableData}>{data.result['liveliness_percentage']}%</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Match Percentage:</strong></td>
            <td style={styles.tableData}>{data.result['match_percentage']}%</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Total Valid Frames:</strong></td>
            <td style={styles.tableData}>{data.result['total_valid_frames']}</td>
          </tr>
          <tr>
            <td style={styles.tableData}><strong>Verified:</strong></td>
            <td style={styles.tableData}>{data.result.verfied ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    // marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tableData: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default ResponseData;
