import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';

import { initialText } from './utils/typewriter';
import useFetchData from './hooks/useFetchData';
import { CommandType } from './types';
import { getTreeData } from './const/data';

import Loading from './components/Loading';
import PathWrapper from './components/PathWrapper';
import Command from './components/Command';
import { getCommandsAndPath } from './utils/commands';

const App = () => {
  const { repos, packages } = useFetchData();
  const [commands, setCommands] = useState<CommandType[]>([
    {
      command: 'help',
      commandPath: 'root',
    }
  ]);
  const pathRef = useRef('root');
  const [displayContent, setDisplayContent] = useState(false);

  const data = useMemo(() => {
    if (!repos || !packages) return null;

    return getTreeData({ repos, packages })
  }, [repos, packages]);

  const handleKeydown = useCallback((event: KeyboardEvent) => {
    const { key, code } = event;

    if ((key !== 'Enter' && code !== 'Enter') || !data) {
      return;
    }

    const element = document.getElementById('input-value') as HTMLInputElement;
    if (!element) return;
    const text = element.value.trim();
    if (!text) return;

    element.value = '';

    const { commands: newCommands, path, append } = getCommandsAndPath({ path: pathRef.current, command: text, data });
    pathRef.current = path;

    setCommands(prev => {
      if (!append) return newCommands;
      return [...prev, ...newCommands];
    });
  }, [data]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    const timeout = setTimeout(() => {
      setDisplayContent(true);
    }, 1800);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      clearTimeout(timeout);
    }
  }, [handleKeydown]);

  if (!data) return (
    <Loading/>
  );

  const lastPath = commands.length ? commands[commands.length - 1].commandPath : 'root';

  return (
    <div className="app">
      <Typewriter
        options={{
          cursor: '',
        }}
        onInit={initialText}
      />
      {displayContent && commands.map((commandData, index) => {
        const prevPath = index > 0 ? commands[index - 1].commandPath : 'root';
        return (
          <Command command={commandData} data={data} key={commandData.commandPath + index} prevPath={prevPath}/>
        )
      })}
      {displayContent && (
        <PathWrapper path={lastPath}>
          <input type="text" autoFocus id="input-value"/>
        </PathWrapper>
      )}
    </div>
  );
};

export default App;
