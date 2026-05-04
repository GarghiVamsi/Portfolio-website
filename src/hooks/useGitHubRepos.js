import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(`gh_repos_${username}`);
    if (cached) {
      setRepos(JSON.parse(cached));
      setLoading(false);
      return;
    }

    axios
      .get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`)
      .then(res => {
        const filtered = res.data.filter(r => !r.fork);
        sessionStorage.setItem(`gh_repos_${username}`, JSON.stringify(filtered));
        setRepos(filtered);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  return { repos, loading, error };
}
