


### @ngInject ###
LegacyConfig = ($stateProvider) ->
  @.$inject = ['$stateProvider']
  $stateProvider
  .state "legacy",
    url: "/legacy"
    templateUrl: "app/legacy/legacy/legacy.html"
    controller: "LegacyController"
    controllerAs: "legacy"

angular.module("ALTGC").config(LegacyConfig)
