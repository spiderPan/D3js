<!DOCTYPE html>
<head>
<title>D3 Lab Location</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style>
	html, body, #d3-map {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	#d3-map {
		height: 700px;
	}

	.stations, .stations svg {
		position: absolute;
	}

	.stations svg {
		width: 60px;
		height: 20px;
		padding-right: 100px;
		font: 10px sans-serif;
	}

	.stations circle {
		fill: brown;
		stroke: black;
		stroke-width: 1.5px;
	}

</style>
<script src="//maps.google.com/maps/api/js?sensor=true"></script>
<script src="//d3js.org/d3.v3.min.js"></script>
</head>
<body>
<div id="d3-map"></div>
<script src="script.js"></script>
</body>

