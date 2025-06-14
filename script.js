var app = angular.module("weatherApp", []);

app.service("WeatherService", function ($http) {
  var apiKey = "dec057927972489f979170840250705"; // Replace with your actual WeatherAPI key
  this.getWeatherData = function (cityName) {
    return $http({
      method: "GET",
      url: "https://api.weatherapi.com/v1/current.json",
      params: {
        key: apiKey,
        q: cityName,
      },
    });
  };
});

app.controller("WeatherController", function ($scope, WeatherService) {
  $scope.cityName = "";
  $scope.weatherData = null;
  $scope.loading = false;
  $scope.errorMessage = "";

  $scope.getWeather = function () {
    if (!$scope.cityName) {
      $scope.errorMessage = "Please enter a city name";
      return;
    }

    $scope.loading = true;
    $scope.weatherData = null;
    $scope.errorMessage = "";

    WeatherService.getWeatherData($scope.cityName)
      .then(function (response) {
        $scope.weatherData = response.data;
        $scope.loading = false;
      })
      .catch(function (error) {
        $scope.loading = false;
        if (error.status === 400 || error.status === 404) {
          $scope.errorMessage =
            "City not found. Please check the spelling and try again.";
        } else {
          $scope.errorMessage =
            "Error fetching weather data. Please try again later.";
        }
        console.error("Error:", error);
      });
  };
});
