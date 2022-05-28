import { useEffect, useState } from 'react';
import axios from 'axios';

import { PackageType, RepoType } from '../types';

const useFetchData = () => {
  const [repos, setRepos] = useState<RepoType[] | null>(null);
  const [packages, setPackages] = useState<PackageType[] | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      const [reposResult, packagesResult] = await Promise.all([
        axios.get('https://api.github.com/users/DJanoskova/repos?per_page=100'),
        axios.get('https://api.npms.io/v2/search?q=maintainer:djanoskova'),
      ]);
      setRepos(reposResult.data);
      setPackages(packagesResult.data.results);
    }

    handleFetch();
  }, []);

  const starredRepos = repos
    ?.filter(repo => repo.stargazers_count > 6)
    .sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    });

  const npmPackages = packages
    ?.filter(p => !p.flags?.unstable)
    .sort((a, b) => {
      return b.score.final - a.score.final;
    });

  return {
    repos: starredRepos,
    packages: npmPackages,
  }
}

export default useFetchData;
