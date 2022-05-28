import React, { FunctionComponent } from 'react';

import { CommandType, NodeType } from '../types';
import { getCurrentNode } from '../utils/path';

import Tree from './Tree';
import PathWrapper from './PathWrapper';

interface CommandProps {
  data: NodeType[];
  command: CommandType;
  prevPath?: string;
}

const Command: FunctionComponent<CommandProps> = ({ data, command, prevPath = 'root' }) => {
  if (command.hidden) return null;

  const currentFolder = getCurrentNode(data, command.commandPath);

  let content;
  let error;

  switch (command.command) {
    case 'ls':
      content = <Tree node={currentFolder} />;
      break;
    case 'help':
      content = <p>Type `ls` to see the document structure, `cd folder` to navigate into a folder, `cd ..` to navigate back and `clear` to clear the console.</p>;
      break;
    default:
      content = null;
      break;
  }

  if (command.error) {
    error = <span className="command-error">{command.error}</span>
  }

  return (
    <>
      <PathWrapper path={prevPath}>
        {command.command}
      </PathWrapper>
      {content}
      {error}
    </>
  );
}

export default Command;
