angular.module('testApp')
    .directive('todoFooter', function () {
        return {
            restrict: 'E',
            template: require('./test.html')
        };
    });
