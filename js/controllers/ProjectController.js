(function() {

	angular.module('filmVizApp')
		.controller('ProjectController', function() {
			this.project = project;
		});


	project = {
			name:"prueba",
			videosrc:"video.mp4",
			analysis: [
				{
					name:"color",
					isDone:false,
					data:[
							{
							tc: "00:00:30.0",
							content: {
								colors:["#372719","#514a3f","#6a5c45","#8b7863","#21221d","#010401","#131612","#2e3331","#596263","#a8b1b2","#b7bebe","#c6cdcd","#737b7f","#838b8f","#929a9e","#9da6aa"]
								},
							},
							{
							tc: "00:01:00.0",
							content: {
								colors:["#372719","#514a3f","#6a5c45","#8b7863","#21221d","#010401","#131612","#2e3331","#596263","#a8b1b2","#b7bebe","#c6cdcd","#737b7f","#838b8f","#929a9e","#9da6aa"]
								},
							},
							{
							tc: "00:01:30.0",
							content: {
								colors:["#372719","#514a3f","#6a5c45","#8b7863","#21221d","#010401","#131612","#2e3331","#596263","#a8b1b2","#b7bebe","#c6cdcd","#737b7f","#838b8f","#929a9e","#9da6aa"]
								},
							},
						]
				},
				{
					name:"audio",
					isDone:false,
					data:[
							{
							tc: "00:00:30.0",
							content: {
								},
							},
							{
							tc: "00:01:00.0",
							content: {
								},
							},
							{
							tc: "00:01:30.0",
							content: {
								},
							},
						]
				},
				{
					name:"motion",
					isDone:false,
					data:[
							{
							tc: "00:00:30.0",
							content: {
								},
							},
							{
							tc: "00:01:00.0",
							content: {
								},
							},
							{
							tc: "00:01:30.0",
							content: {
								},
							},
						]
				},
				{
					name:"metadata1",
					isDone:false,
					tags: [],
					data:[
							{
							tc: "00:00:30.0",
							content: {
								text:"hola"
								},
							},
							{
							tc: "00:01:00.0",
							content: {
								text:"hola 	que pasa"
								},
							},
							{
							tc: "00:01:30.0",
							content: {
								text:"eooooooooooooooooooooooooo"
								},
							},
						]
				},
				{
					name:"metadata2",
					isDone:false,
					tags: [],
					data:[
							{
							tc: "00:00:30.0",
							content: {
								text:"hola22222"
								},
							},
							{
							tc: "00:01:00.0",
							content: {
								text:"hola 	que pasa22222"
								},
							},
							{
							tc: "00:01:30.0",
							content: {
								text:"eooooooooooooooooooooooooo2222222"
								},
							},
						]
				},
			]
	 	};




}());