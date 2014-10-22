using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using GitSharp;

namespace GitVpm.GitHelper
{
    public class GitHepler
    {
        public List<Commit> GetCommitHistory()
        {
            var commits = new List<Commit>();
            var repository = new Repository(ConfigurationManager.AppSettings["ProjectPath"]);

            return RetriveAllCommits(repository.CurrentBranch.CurrentCommit,commits);
        } 

        private List<Commit> RetriveAllCommits(Commit commit, List<Commit> commits)
        {
            commits.Add(commit);
            if (commit.HasParents)
            {
                RetriveAllCommits(commit.Parent, commits);
            }
            return commits;
        }
    }
}