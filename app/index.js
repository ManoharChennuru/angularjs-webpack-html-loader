/*global angular */

/**
 * The main testApp app module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');

angular.module('testApp', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TestCtrl',
			templateUrl: './main.html',
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

require('./controllers/testCtrl');
require('./directives/test.directive');
