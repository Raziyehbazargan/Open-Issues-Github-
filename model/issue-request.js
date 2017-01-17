(function(module){
  'use strict';

//this comment set up here to turn off eslint warnings about unused vars
/*global issues issueView helpers:true*/
  function RepoIssue (opts){
    this.repoOwner = opts.html_url.split('/')[3];
    this.repoName = opts.html_url.split('/')[4];
    this.issueUser = opts.user.login;
    this.issueUserAvatarURL = opts.user.avatar_url;
    this.issueUserAcctURL = opts.user.html_url;
    this.dateCreated = helpers.parseGitHubDate(opts.created_at),
    this.daysAgo = helpers.numberOfDaysAgo(this.dateCreated);
    this.repoURL = opts.repository_url,
    this.issueURL = opts.html_url,
    this.title = opts.title,
    this.body = opts.body,
    this.id = opts.id;
  }

  let issues = {};
  issues.success = true;

  issues.data = [];
  issues.owner;
  issues.repo;


  issues.fetchData = function(callback, callback2){
    $.when(
      $.get(`/github/repos/${issues.owner}/${issues.repo}/issues`)
      .done((data) => {
        data.forEach((element) => {
          let issue = new RepoIssue(element);
          issues.data.push(issue);
        });
        callback(issues.data, issueView.alertIfNoIssues);
        callback2('.issue-list');
      })
      .fail(() => {
        issues.success = false;
        alert('Request did not go through. Try a full Github URL in the form of https://github.com/<user>/<repo>');
        console.log('error handling request');
      })
    );
  };


  module.issues = issues;
})(window);
