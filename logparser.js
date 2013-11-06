// Parser constructor.
var Parser = function() {

};

// Parses the specified text.
Parser.prototype.parse = function(text) {

  var results = {};

  // Break up the file into lines.
  // var lines = text.trim().split('\n');
  var lines = text.split('\n\r');
  var index = 0;

  /*
  lines.forEach(function(line) {
	  var valErrorRegex = /\[(.*)\]\s+Insertion failed:/;
	  var arr = valErrorRegex.exec(line);
	  if(!arr) {
		  // no match
		  console.log(line);
	  } else {
		// Insertion Failed line
		var myDate = arr[1].split(' ');
		var day = myDate[0];
		var month = myDate[1];
		var year = myDate[2];
		results.uid = index;
		results.uid.day = day;
		results.uid.month = month;
		results.uid.year = year;
	  }
	  index++;
  });

*/
  lines.forEach(function(line) {

	    var regex = /\[(.*)\]\s+Insertion/;
	    var arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Insertion Failed line
		var myDate = arr[1].split(' ');
		var day = myDate[0];
		var month = myDate[1];
		var year = myDate[2];
	    	var uid = year + "-" + month + "-" + day + "[" + index + "]";
		results[uid] = {};
		results[uid].day = day;
		results[uid].month = month;
		results[uid].year = year;
	    }
	    regex = /Validation error:(.*)/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].error = arr[1];
		results[uid].type = 'Validation';
	    }
	    regex = /Error executing SQL query/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].type = 'Query';
	    }
	    regex = /QUERY = (.*)/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].query = arr[1];
	    }
	    regex = /ERROR = (.*)/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].error = arr[1];
	    }
	    regex = /File: (.*)/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].file = arr[1];
	    }
	    regex = /Source: (.*)/;
	    arr = regex.exec(line);
	    if(!arr) {
	       // console.log("no match");
	    }
	    else {
		// Validation error line
		results[uid].source = arr[1];
	    }
  	index++;

  });

  return results;

};



// Export the Parser constructor from this module.
module.exports = Parser;

