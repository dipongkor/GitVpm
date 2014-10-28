"use strict";

(function (app) {
    app.controller("HomeCtrl", [
        "$scope", "gitHelperSvc", "$http", function ($scope, gitHelperSvc, $http) {


            $scope.name = "Atish";
            gitHelperSvc.getAllCommits().then(function (data) {
                console.log(data);
            });


            $scope.filterOptions = {
                filterText: "",
                useExternalFilter: true
            };

            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes: [5, 10, 15],
                pageSize: 5,
                currentPage: 1
            };

            $scope.setPagingData = function (data, page, pageSize) {
                var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                $scope.myData = pagedData;
                $scope.totalServerItems = data.length;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };

            $scope.getPagedDataAsync = function (pageSize, page, searchText) {
                setTimeout(function () {
                    var data;
                    if (searchText) {
                        var ft = searchText.toLowerCase();
                        $http.get('Home/GetCommits').success(function (largeLoad) {
                            console.log(largeLoad.length);
                            data = largeLoad.filter(function (item) {
                                return angular.fromJson(item).toLowerCase().indexOf(ft) != -1;
                            });
                            $scope.setPagingData(data, page, pageSize);
                        });


                    } else {
                        $http.get('Home/GetCommits').success(function (largeLoad) {
                            $scope.setPagingData(largeLoad, page, pageSize);
                        });
                    }
                }, 100);
            };

            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

            $scope.$watch('pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);
            $scope.$watch('filterOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
                }
            }, true);

            function formatDateTime(jsonDate) {
                var date = new Date(parseInt(jsonDate.substr(6)));
                var formattedDate = date.format("dd-MM-yyyy");
                return formattedDate;
            }

            //Start - Initialize Array to keep selected Ids...; Author: Biswajit
            $scope.mySelections = [];
            $scope.selectedIDs = [];
            //End - Edited; Author: Biswajit

            $scope.gridOptions = {
                data: 'myData',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                filterOptions: $scope.filterOptions,
                enableColumnResize: true,
                showSelectionCheckbox: true,

                
                //Start - Filter the Id/ Hash from selection of grid row select; Author: Biswajit
                selectedItems: $scope.mySelections,
                afterSelectionChange: function () {
                    $scope.selectedIDs = [];
                    $scope.selectedDatas = $scope.selectedData || [];
                    $scope.selectedChanges = [];
                    angular.forEach($scope.mySelections, function (item) {
                        angular.forEach(item.Changes, function (change) {
                            //console.log(" * " + change.Name + " " + change.Path);
                            if (typeof _.findWhere($scope.selectedChanges, change) == "undefined") {
                                $scope.selectedChanges.push(change);
                            }

                            // Test....

                        });
                    });
                }
                //End - Edited; Author: Biswajit
            };


            $scope.gridChangesOptions = {
                data: 'selectedChanges',
                enablePaging: true,
                enableColumnResize: true,
                showSelectionCheckbox: true,
                //Start - Edited; Author: Biswajit
                selectedItems: $scope.myChangesSelection,
                afterSelectionChange: function () {

                }
                //End - Edited; Author: Biswajit
            };

        }
    ]);
})(_$.app);