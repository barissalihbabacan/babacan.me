import { useState, useEffect } from 'react';

export const useGithubStats = () => {
  const [stats, setStats] = useState({ followers: 0, repos: 0, stars: 0, forks: 0 });
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const username = 'barissalihbabacan';
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();
        
        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
          const forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
          
          setStats({
            followers: userData.followers || 0,
            repos: reposData.length,
            stars,
            forks
          });
          
          const langs = {};
          reposData.forEach(repo => {
            if (repo.language) {
              langs[repo.language] = (langs[repo.language] || 0) + 1;
            }
          });
          setLanguages(langs);
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, languages, loading };
};

export const useGithubRepos = (type) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(false);
      
      let url = '';
      if (type === 'personal') {
        url = 'https://api.github.com/users/barissalihbabacan/repos?sort=updated&per_page=6';
      } else if (type === 'org-sins') {
        url = 'https://api.github.com/orgs/thesinsofthefathers/repos?sort=updated&per_page=6';
      } else if (type === 'org-osmos') {
        url = 'https://api.github.com/orgs/Osmos-App/repos?sort=updated&per_page=6';
      }
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setRepos(data.slice(0, 6));
        } else {
          setRepos([]);
        }
      } catch (error) {
        console.error('Error fetching repos:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [type]);

  return { repos, loading, error };
};
