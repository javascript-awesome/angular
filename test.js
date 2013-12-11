'use strict';

angular.module('adminConsole.services').factory('environmentsList', ['$rootScope','environments', function ($rootScope, environments) {

    var listPromise;

    var loadList = function() {
        return environments.getList().then(function (response) {
            return (response instanceof Array) ? response : [];
        });
    }

    var getList = function(clearCache) {
        if (clearCache) {
            listPromise = null;
        }
        return listPromise || (listPromise = loadList());
    };

    var findEnvironmentById = function(list, envId) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === envId) {
                return i;
            }
        }
        return -1;
    };

    return {

        /**
         * Get list of environments
         * @returns {Object} promise
         */
        getList: function() {
            return getList();
        },

        /**
         * Get fresh list of environments  and notify subscribers
         * @returns {Object} promise
         */
        reloadList: function() {
            return getList(true).then(function (list) {
                $rootScope.$broadcast($rootScope.app.config.events.services.environmentsList.updated, list);
                return list;
            });
        },

        /**
         * Check if environments list was updated remotely
         * @returns {Object} promise
         */
        checkForUpdates: function() {
            return getList().then(function (list) {
                return loadList().then(function (newList) {
                    /**
                     * Use angular.toJson method
                     * to strip any kind of $$hashKey properties that could break comparison logic
                     */
                    return (angular.toJson(list) != angular.toJson(newList));
                });
            });
        },

        /**
         * Update existing environment details or add new
         * @param {Object} environmentDetails
         * @returns {Object} promise
         */
        replaceEnvironment: function(environmentDetails) {
            return getList().then(function (list) {
                var i = findEnvironmentById(list, environmentDetails.id);
                if (i !== -1) {
                    list[i] = environmentDetails;
                    return i;
                }
                return list.push(environmentDetails) - 1;
            });
        },

        /**
         * Fetch new instance of environment details from server
         * @param {String} envId
         * @returns {Object} promise
         */
        reloadEnvironment: function(envId) {
            var self = this;
            return environments.getDetails(envId).then(function (details) {
                self.replaceEnvironment(details).then(function (index) {
                    $rootScope.$broadcast($rootScope.app.config.events.services.environmentsList.itemUpdated, details, index);
                });
                return details;
            });

        },

        /**
         * Removes environment from the list by id
         * @param {String} envId
         * @returns {Object} promise
         */
        removeEnvironment: function(envId) {
            return getList().then(function (list) {
                var i = findEnvironmentById(list, envId);
                if (i !== -1) {
                    return list.splice(i,1).length;
                }
                return 0;
            });
        },

        /**
         * Get environment identifiers
         * @param {Boolean} lowerCase
         * @returns {Object} promise
         */
        getEnvironmentIds: function(lowerCase) {
            return getList().then(function (list) {
                var ids = [];
                for (var i = 0; i < list.length; i++) {
                    var id = (lowerCase) ? list[i].id.toLowerCase() : list[i].id;
                    ids.push(id);
                }
                return ids;
            });
        }
    }
}]);
