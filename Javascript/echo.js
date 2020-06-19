
function echo(str, num) {
	for(var i = 0; i< num; i++){
		console.log(str)
	}
}

echo("Echo",10)


/**
  *
  */
function average(scores) {
	if(scores.length == 0) {
		return 0;
	}
	var total = 0;
	scores.forEach(function(score){
		total += score;
	})
	
	var avg = total/scores.length
	
	return Math.round(avg);
}

