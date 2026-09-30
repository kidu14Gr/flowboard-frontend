import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState({
    id: '1',
    key: 'FB',
    name: 'FlowBoard Main',
    category: 'Software Project'
  });

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
