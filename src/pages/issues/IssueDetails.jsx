import React from 'react';
import { useParams } from 'react-router-dom';

const IssueDetails = () => {
  const { key } = useParams();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Issue Details: {key || 'FB-101'}</h1>
          <p className="page-subtitle">Implement OAuth 2.0 User Authentication Flow</p>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
