angular.module("app", [])
.config(function($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
})
.controller("home", function($http, $location) {
	var self = this;
	$http.get('/user').then(
		function(response) {
			if (response.data.userAuthentication) {
				self.user = response.data.userAuthentication.details.name;
				self.authenticated = true;
				console.log(self);
			} else {
				self.user = "N/A";
				self.authenticated = false;
			}
		}, function(response) {
			self.user = "N/A";
			self.authenticated = false;
		}
	);
	self.logout = function() {
		$http.post('logout', {}).then(
			function(response) {
				self.authenticated = false;
				$location.path("/");
			}, function(response){
				console.log("Logout failed")
				self.authenticated = false;
			}
		);
	};
});
