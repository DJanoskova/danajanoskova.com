export interface CommandType {
  command: string;
  commandPath: string;
  hidden?: boolean;
  error?: string;
}

export interface RepoType {
  name: string;
  html_url: string;
  stargazers_count: number;
}

export interface PackageType {
  flags?: {
    unstable?: boolean;
  };
  score: {
    final: number;
  };
  package: {
    name: string;
    version: string;
    links: {
      npm: string;
    };
  }
}

export interface NodeType {
  name: string;
  link?: string;
  note?: string;
  children?: Array<NodeType>;
}
