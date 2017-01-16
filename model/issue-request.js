(function(module){
  'use strict';

  function RepoIssue (opts){
    this.repoOwner = opts.html_url.split('/')[3];
    this.repoName = opts.html_url.split('/')[4];
    this.issueUser = opts.user.login;
    this.issueUserAvatarURL = opts.user.avatar_url;
    this.issueUserAcctURL = opts.user.html_url;
    this.dateCreated = helpers.parseGitHubDate(opts.created_at),
    this.repoURL = opts.repository_url,
    this.issueURL = opts.html_url,
    this.title = opts.title,
    this.body = opts.body,
    this.id = opts.id;
  }

  //https://github.com/github/hub/issues/1382"

  let issues = {};

  issues.data = [];

  issues.fetchData = function(){
    $.when(
      $.get('/github/repos/github/hub/issues')
      .done((data) => {
        console.log(data);
        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });
        console.log('my issues array', issues.data);
      })
    );
  };
  issues.fetchData();

  module.issues = issues;
})(window);
