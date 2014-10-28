using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using GitVpm.GitHelper;

namespace GitVpm.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult GetCommits()
        {
            var commits = new GitHepler().GetCommitHistory();


            var data = from commit in commits
                       select
                           new
                           {
                               Id = commit.Hash,
                               CommitAuthor = commit.Author.Name,
                               Commited = commit.CommitDate,
                               CommitMessage = commit.Message,
                               Changes = from change in commit.Changes select new { Name = change.Name, Path = change.Path}
                           };
            return Json(data, JsonRequestBehavior.AllowGet);

        }
    }
}