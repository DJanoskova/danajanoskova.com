import { getCommandPath, getCurrentNode } from './path';
import { CommandType, NodeType } from '../types';

export const getCommandsAndPath = ({ path, command, data }: {
  path: string;
  command: string;
  data: NodeType[];
}) => {
  let newCommandData: CommandType[] = [];

  const commands = command.split('&&');
  let newPath: string = path;
  let hidden = false;
  let checkForError = false;
  let error = '';

  commands.forEach(localCommand => {
    localCommand = localCommand.trim();

    switch (localCommand) {
      case 'ls':
      case 'help':
        break;
      case 'clear':
        hidden = true;
        newCommandData = [];
        break;
      default:
        checkForError = true;
        newPath = getCommandPath(localCommand, newPath.split('/')).join('/');
        break;
    }

    const resultNode = getCurrentNode(data, newPath);
    const newCommand: CommandType = { commandPath: newPath, command: localCommand, hidden };

    const isFolder = resultNode.children?.length;

    if (checkForError && !isFolder) {
      if (localCommand.startsWith('cd')) {
        const directories = newPath.split('/');
        const lastDirectory = directories[directories.length - 1];
        error = `cd: no such directory: ${lastDirectory}`;
      } else {
        error = `command not found: ${localCommand}`;
      }
    }

    if (error) {
      newCommand.error = error;
      newCommand.commandPath = path;
    }

    newCommandData.push(newCommand);
  });

  return {
    commands: newCommandData,
    path: error ? path : newPath,
    append: !hidden,
  }
}