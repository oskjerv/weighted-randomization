const data = [
  ["Profil 01", 5.00],
  ["Profil 02", 5.00],
  ["Profil 03", 0.27],
  ["Profil 04", 0.77],
  ["Profil 05", 0.29],
  ["Profil 06", 0.29],
  ["Profil 07", 2.05],
  ["Profil 08", 1.05],
  ["Profil 09", 0.70],
  ["Profil 10", 0.27],
  ["Profil 11", 0.70],
  ["Profil 12", 0.27],
  ["Profil 13", 1.94],
  ["Profil 14", 0.77],
  ["Profil 15", 0.27],
  ["Profil 16", 0.27],
  ["Profil 17", 0.27],
  ["Profil 18", 0.77],
  ["Profil 19", 0.70],
  ["Profil 20", 0.70],
  ["Profil 21", 0.70],
  ["Profil 22", 1.05],
  ["Profil 23", 0.70],
  ["Profil 24", 0.27],
  ["Profil 25", 5.00],
  ["Profil 26", 5.00],
  ["Profil 27", 36.00 - 35.06999999999999]
];

// create table when windows is loaded
window.onload = function(e) {
  createTable(data);
}

// run function when button is clicked
$('#randomiser').click(function() {
  results = testran(data);
  addResults(results);
});


// weighted randomization
function weighted_random(data) {
  // Finne totalen.
  var total = 0;
  for (var i = 0; i < data.length; ++i) {
    total += data[i][1];
  }

  //console.log(total);


  // Sette tilfeldig terskelverdi basert på totalen.
  var threshold = Math.random() * total;

  // Looper gjennom og finner første verdi som befinner seg innenfor terskelverdien.
  total = 0;
  for (var i = 0; i < data.length - 1; ++i) {
    // Legger vekten inn i løpende total.
    total += data[i][1];

    // Dersom verdien faller innenfor terskelverdien, returner denne vekten. 
    if (total >= threshold) {
      return data[i][0];
    }
  }
  // Hvis siste item velges. 
  return data[data.length - 1][0];
}

function testran() {
  var results = [];

  for (var i = 0; i < 1001; i++) {
    results.push(weighted_random(data));
  }


  const counts = {};

  for (const num of results) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  //console.log(counts);
  //console.log(counts);
  return (counts)
}

// Create a table based on the data-array (see top
function createTable(data) {
  var table = document.createElement('table');
  table.setAttribute("id", "dataTable");
  var tableBody = document.createElement('tbody');

  var firstrow = document.createElement('tr');
  var firstheader = document.createElement('th');
  firstheader.appendChild(document.createTextNode('Profil'))
  var secondheader = document.createElement('th');
  secondheader.appendChild(document.createTextNode('Vekt'))
  
  firstrow.appendChild(firstheader);
  firstrow.appendChild(secondheader);
  tableBody.appendChild(firstrow);
  
	
  data.forEach(function(rowData) {

    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));

      row.appendChild(cell);
    });

    tableBody.appendChild(row);

  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}


// Function for adding new column with 
// randomization results to column.
function addResults(results) {

	// get testdata
  results = testran(data)
  //get all rows associated with #dataTAble
  let trs = document.querySelectorAll('#dataTable tr');

  first = true;
  iterate = 0;
  // For each row, add first a header
  for (let tr of trs) {
    if (first) {
      let th = document.createElement('th');
      th.textContent = "n/1000 (run " + (tr.cells.length - 1) + ")";
      tr.appendChild(th);
    } else {
			// if header is added, add data from result dictionary
      let td = document.createElement('td');
      td.textContent = results[tr.firstChild.textContent];
      tr.appendChild(td);
    }
    first = false;

    iterate += 1;

  }
}
