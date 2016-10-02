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
			var def = $q.defer();
			config.method = 'GET';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				def.resolve(responseData.data);
			}, function(errorResponse) {
				def.reject(errorResponse.data);
			});
			return def.promise;
		}
		
		this.post = function(url, parameter) {
			var def = $q.defer();
			config.method = 'POST';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				def.resolve(responseData.data);
			}, function(errorResponse) {
				def.reject(errorResponse.data);
			});
			return def.promise;
		}
		
		this.put = function(url, parameter) {
			var def = $q.defer();
			config.method = 'put';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				def.resolve(responseData.data);
			}, function(errorResponse) {
				def.reject(errorResponse.data);
			});
			return def.promise;
		}
		
		this.callDelete = function(url, parameter) {
			var def = $q.defer();
			config.method = 'delete';
			config.url = url;
			if (parameter) {
				config.data = parameter;
			}
			$http(config).then(function(responseData) {
				def.resolve(responseData.data);
			}, function(errorResponse) {
				def.reject(errorResponse.data);
			});
			return def.promise;
		}

	}
	angular.module('appUtils', []).service('restClient',
			[ '$q', '$http', restClient ]);
})();