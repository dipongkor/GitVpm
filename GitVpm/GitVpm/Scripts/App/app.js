"use strict";

var _$ = _$ || {};

(function() {
    var app = _$.app = angular.module("gitVpmApp", ["ngRoute", "ngResource", "ngGrid"]);
    app.config(["$routeProvider", "$locationProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "Templates/Home/Index.html",
            controller: "HomeCtrl"
        });

    }]);
})();