import { NodeType } from '../types';

const pathGoBack = (path: string[]) => {
  path.splice(path.length - 1, 1);
}

export const getCommandPath = (command: string, currentPath: string[]): string[] => {
  let path = JSON.parse(JSON.stringify(currentPath));

  switch (command) {
    case 'cd ..':
      pathGoBack(path);
      return path;
    default:
      if (command.endsWith('/')) {
        command = command.slice(0, -1);
      }
      if (command.startsWith('cd ../')) {
        pathGoBack(path);
        command = command.replace('../', '');
      } else if (command.startsWith('cd ./')) {
        command = command.replace('./', '');
      }
      const destination = command.replace('cd ', '');
      return [...path, destination];
  }
}

export const getCurrentNode = (data: NodeType[], path = '/'): NodeType => {
  const pathSegments = path.split('/');
  let temporaryData = data;

  pathSegments.forEach(segment => {
    temporaryData = temporaryData.find(d => d.name === segment)?.children || [];
  });

  return {
    name: pathSegments[pathSegments.length - 1],
    children: temporaryData
  };
}
