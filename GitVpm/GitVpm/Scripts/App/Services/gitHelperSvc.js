"use strict";

(function(app) {
    app.factory("gitHelperSvc", [
        "$http", "$q", function ($http, $q) {

            var commits = function() {
                var deferred = $q.defer();
                $http.get('Home/GetCommits')
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response, status) {
                    deferred.reject(status);
                    });
                return deferred.promise;
            };

            return {
                getAllCommits:commits
            }

        }
    ]);
})(_$.app);