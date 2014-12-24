(function(){
var app = angular.module('myDirective', []);

app.directive('searchBox', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/searchbox.html'
	}
});
app.directive('inputBox', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/inputbox.html'
	}
});
app.directive('navBar', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/navbar.html'
	}
});
/*
app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});
*/
app.directive("onReadFile", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);
})();