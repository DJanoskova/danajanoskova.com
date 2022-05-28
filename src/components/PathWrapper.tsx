import React, { FunctionComponent, ReactNode } from 'react';

const PathWrapper: FunctionComponent<{ path: string; children?: ReactNode }> = ({ path, children }) => {
  return (
    <div className="command">
      <span className="command__prefix">~ {path} %</span>
      <span className="command__content">{children}</span>
    </div>
  )
}

export default PathWrapper;
