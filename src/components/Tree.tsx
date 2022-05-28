import React, { FunctionComponent } from 'react';
import Typewriter from 'typewriter-effect';

import { NodeType } from '../types';

interface TreeProps { node: NodeType, level?: number }

const Tree: FunctionComponent<TreeProps> = ({ node, level = 0 }) => {
  const nodeText = node.children
    ?.map(child => {
      let content = child.name;
      if (child.link) {
        content = `<a href="${child.link}" rel="noreferrer" target="_blank">${content}</a>`;
      }
      if (child.note) content += ` ${child.note}`;

      for (let i = 0; i < level; i++) {
        content = `│   ${content}`;
      }

      content = `├──  ${content}`;

      return content;
    })
    .join('\n');

  return (
    <div className="tree">
      <Typewriter
        options={{
          cursor: '',
        }}
        onInit={(typewriter) => {
          typewriter
            .changeDelay(5)
            .typeString(`<div>${nodeText}</div>`)
            .start();
        }}
      />
    </div>
  );
};

export default Tree;
