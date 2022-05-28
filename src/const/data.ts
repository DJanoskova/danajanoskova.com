import { NodeType, PackageType, RepoType } from '../types';

export const getTreeData = ({ repos, packages }: {
  repos: RepoType[];
  packages: PackageType[];
}): NodeType[] => {
  return [{
    name: 'root',
    children: [
      {
        name: 'stack',
        children: [
          {
            name: 'JavaScript'
          },
          {
            name: 'TypeScript'
          },
          {
            name: 'React'
          },
          {
            name: 'Node.js'
          },
          {
            name: 'CSS'
          },
          {
            name: 'Photoshop'
          },
          {
            name: 'Vue.js'
          }
        ]
      },
      {
        name: 'expertise',
        children: [
          {
            name: 'Open Source'
          },
          {
            name: 'Public projects'
          },
          {
            name: 'Front-end performance optimization'
          },
          {
            name: 'Data architecture'
          },
        ]
      },
      {
        name: 'github',
        children: repos.map(repo => ({
          name: repo.name,
          link: repo.html_url,
          note: `(${repo.stargazers_count}★)`,
        }))
      },
      {
        name: 'npm',
        children: packages.map(p => ({
          name: p.package.name,
          link: p.package.links.npm,
          note: `(${p.package.version})`
        }))
      },
      {
        name: 'links',
        children: [
          {
            name: 'linkedin.com/in/dana-janoskova',
            link: 'https://www.linkedin.com/in/dana-janoskova/',
          },
          {
            name: 'cv.danajanoskova.com',
            link: 'https://cv.danajanoskova.sk/',
          },
          {
            name: 'github.com/DJanoskova',
            link: 'https://github.com/DJanoskova',
          }
        ]
      }
    ],
  }]
}
