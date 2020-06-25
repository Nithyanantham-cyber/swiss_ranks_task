var label = [];
var title = [];
var data = [];

function dashboard(){
    var table = JSON.stringify("dashboard");
    $.ajax({
        url: 'php/fetch.php',
        type: 'POST',
        dataType: 'json',
        data: table,
        success: function(msg) {
          $('#parts_count').html(msg[0]['Part_count'])
          $('#creator_count').html(msg[0]['Creator_count'])
          $('#approver_count').html(msg[0]['Approver_count'])
          $('#category_count').html(msg[0]['Category_count'])
        }
    });
};

function parts() {
    var table = JSON.stringify("parts");
    $.ajax({
    	url: 'php/fetch.php',
    	type: 'POST',
    	dataType: 'json',
    	data: table,
    	success: function(msg) {
            for( i=0 ; i<msg.length; i++)
            {
                label.push(msg[i]['Status']);
                data.push(msg[i]['Count']);
            }
            createTable(label,data);
            pieChart(label,data);
        }
    });
};

function engineer() {
    var table = JSON.stringify("engineer");
    $.ajax({
        url: 'php/fetch.php',
        type: 'POST',
        dataType: 'json',
        data: table,
        success: function(msg) {
            for( i=0 ; i<msg.length; i++)
            {
                label.push(msg[i]['Creator']);
                data.push(msg[i]['Count']);
            }
            title.push('Created By'); 
            createTable(label,data);
            barChart(label,data);
        }
    });
};

function category() {
    var table = JSON.stringify("category");
    $.ajax({
        url: 'php/fetch.php',
        type: 'POST',
        dataType: 'json',
        data: table,
        success: function(msg) {
            for( i=0 ; i<msg.length; i++)
            {
                label.push(msg[i]['Category']);
                data.push(msg[i]['Count']);
            }

            title.push('Stream');
            createTable(label,data);
            barChart(label,data);
        }
    });
};


function approver() {
    var table = JSON.stringify("approver");
    $.ajax({
        url: 'php/fetch.php',
        type: 'POST',
        dataType: 'json',
        data: table,
        success: function(msg) {
            for( i=0 ; i<msg.length; i++)
            {
                label.push(msg[i]['Approver']);
                data.push(msg[i]['Count']);
            }

            title.push('Approved By');
            createTable(label,data);
            barChart(label,data);
        }
    });
};


function createTable(label,data)
{
    var table_code = "<table class='table table-hover'>";
        table_code += "<th>Status</th><th>Count</th>";
    for( i=0 ; i<label.length; i++)
    {
        table_code += "<tr>";
        table_code += "<td>"+label[i]+"</td>";
        table_code += "<td>"+data[i]+"</td>";
        table_code += "</tr>";
    }
    table_code += "</table>";
    $('#table').html(table_code);
}

function pieChart(label,data)
{ 
var canvas = document.getElementById("partsChart");
var ctx = canvas.getContext('2d');

ctx.canvas.width = 500;
ctx.canvas.height = 400;

Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'black';

var data = {
    labels: label,
    datasets: [
    {
        fill: true,
        backgroundColor: ['#003f5c','#1d7874','#ee2e31','#ffa600','#f4c095'],        
            data: data,
    }
    ]
};

var options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
                  display: true,
                  text: 'Statistics On parts Created',
                  position: 'bottom'
              },
        legend: {
            display: true,
            position: 'bottom'
        },
        rotation: -0.7 * Math.PI
        
};

var myBarChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

}

function barChart(label,data)
{ 
    // bar chart 1
    var canvas = document.getElementById("partsChart");
    var ctx = canvas.getContext('2d');

    ctx.canvas.width = 400;
    ctx.canvas.height = 400;

Chart.defaults.global.defaultFontSize = 20;
Chart.defaults.global.defaultFontColor = 'black';
    var data = {
        labels: label,
        datasets: [
        {label: title,
            fill: true,
            backgroundColor: ['#003f5c','#1d7874','#ee2e31','#ffa600','#f4c095'],        
            data: data,
        }
        ]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
         scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true  
                     }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    };


    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: data,
        options: options
    });
}