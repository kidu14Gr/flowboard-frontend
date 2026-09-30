import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FolderKanban, Users, CheckSquare, Layers } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Project Details #{id || '1'}</h1>
          <p className="page-subtitle">FlowBoard Web Application Workspace</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/kanban" className="btn-secondary">Open Kanban</Link>
          <Link to="/scrum" className="btn-primary">Open Scrum Board</Link>
        </div>
      </div>
      <div style={{ padding: '24px', backgroundColor: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <h3>Overview</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Full-stack Jira clone application built with React, Node.js, Express, and PostgreSQL/MongoDB.
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
