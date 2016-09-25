/**
 * 
 */

(function() {
	function restClient($q, $http) {
		var config = {
			method : '',
			url : '',
			// data :'',
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		this.get = function(url, parameter) {
			var promise = $q.defer();
			config.method = 'GET';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				promise.resolve(responseData);
			}, function(errorResponse) {
				promise.reject(errorResponse);
			});
			return promise;
		}
		
		this.post = function(url, parameter) {
			var promise = $q.defer();
			config.method = 'POST';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				promise.resolve(responseData);
			}, function(errorResponse) {
				promise.reject(errorResponse);
			});
			return promise;
		}
		
		this.put = function(url, parameter) {
			var promise = $q.defer();
			config.method = 'put';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				promise.resolve(responseData);
			}, function(errorResponse) {
				promise.reject(errorResponse);
			});
			return promise;
		}
		
		this.callDelete = function(url, parameter) {
			var promise = $q.defer();
			config.method = 'delete';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				promise.resolve(responseData);
			}, function(errorResponse) {
				promise.reject(errorResponse);
			});
			return promise;
		}

	}
	angular.module('appUtils', []).service('restClient',
			[ '$q', '$http', restClient ]);
})();