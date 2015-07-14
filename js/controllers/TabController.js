(function() {	
	angular.module('FilmVizApp')
	.controller('TabController', function() {
			this.activeTab = 0;

			this.selectTab = function(setTab) {
				this.activeTab = setTab;
			};

			this.isSelected = function(checkTab){
				return this.activeTab === checkTab;
			};
		});


}());