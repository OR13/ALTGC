angular.module "ALTGC"
.factory 'githubContributor', ['$log', '$http', ($log, $http) ->

  apiHost = 'https://api.github.com/repos/OR13/ALTGC'

  getContributors = (limit) ->
    getContributorsComplete = (response) ->
      response.data

    getContributorsFailed = (error) ->
      $log.error 'XHR Failed for getContributors.\n' + angular.toJson(error.data, true)
      return

    if !limit
      limit = 30
    $http.get(apiHost + '/contributors?per_page=' + limit).then(getContributorsComplete).catch getContributorsFailed

  service =
    apiHost: apiHost
    getContributors: getContributors
]