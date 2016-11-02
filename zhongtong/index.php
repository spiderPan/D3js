<!DOCTYPE html>
<head>
<title>ZhongTong Heat Map</title>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
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
<script src="http://maps.google.cn/maps/api/js?key=AIzaSyB5CDFlrn4TPi5CPi_ZGCu9AS5hU-l77lk&libraries=visualization"></script>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
	<div class="row">
		<h1 class="text-center">中通快递全国分布</h1>
	</div>
	<div class="row">
		<div class="col-md-6 col-md-offset-3 text-center">
			<button type="button" class="btn btn-default active heatmap">
				<span class="glyphicon glyphicon-picture" aria-hidden="true"></span> 热图 (HeatMap View)
			</button>
			<button type="button" class="btn btn-default marker">
				<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> 位置 (Marker View）
			</button>
		</div>
	</div>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-12">
			<div id="d3-map"></div>
		</div>
	</div>
</div>
<script src="script.js"></script>
</body>
