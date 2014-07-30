angular.module('app').controller('mvCourseListCtrl', function($scope, mvCourse,mvCour,mvNotifier, mvUser) {
  $scope.users=mvUser.query();
  $scope.courses = mvCourse.query();
  $scope.sortOptions = [{value:"title",text: "Sort by Title"},
    {value: "published",text: "Sort by Publish Date"}];
  $scope.sortOrder = $scope.sortOptions[0].value;
    $scope.delete = function(course) {

        mvCour.deleteCourse(course).then(function () {
            mvNotifier.notify('Item deleted!');
         //   alert(course.title);
           $scope.courses.splice($scope.courses.indexOf(course), 1);
        }, function (reason) {
            mvNotifier.error(reason);
        })
    }

    $scope.add = function() {
        var newCourseData = {
            username: $scope.username,
            title: $scope.title,
            featured: true,
            published: new Date(),
            tags: ['C#']
        };

        mvCour.createCourse(newCourseData).then(function () {
            mvNotifier.notify('New item created!');
            $scope.courses.push(newCourseData);
        }, function (reason) {
            mvNotifier.error(reason);
        })
    }
});

