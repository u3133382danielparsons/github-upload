/* 
    Author: Daniel Parsons
    Email: danielmparsons@gmail.com
*/

window.onload = function () {

    // Get and format today's date
    const d = new Date();
    const yyyy = d.getFullYear(); // Current Year
    let mm = d.getMonth() + 1;  // Current Month
    let dd = d.getDate(); // Current Day of the month
    if (dd < 10) { dd = `0${dd}`; }
    if (mm < 10) { mm = `0${mm}`; }
    const today = `${yyyy}-${mm}-${dd}`;

    /* **************************************************** */

    /* 1. COUNTRY POPULATIONS */

    // FORM-ONE SUBMIT EVENT
    const formOne = document.getElementById('formOne');
    const c1id = document.getElementById("countriesOne");
    formOne.addEventListener("submit", function (event) {
        const ulOne = document.getElementsByClassName("list-group-one")[0];

        // Change label text
        document.getElementById('countriesOnelbl').innerText = 'Country';

        // Remove list items
        while (ulOne.firstChild) {
            ulOne.removeChild(ulOne.firstChild);
        }

        // Get Value from select option
        var c1 = c1id.value;

        const url1 = `http://54.72.28.201:80/1.0/population/${c1}/${today}?format=json`;
        // Get data for Population Totals
        fetch(url1)
            .then(response => response.json())
            .then(data => {
                for (let i of Object.keys(data)) {
                    let populationOne = data.total_population.population;
                    populationOne = populationOne.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    let liOne = document.createElement("li");
                    ulOne.appendChild(liOne);
                    liOne.classList.add("list-group-item");
                    let c1f = c1.split("%20").join(" ");
                    liOne.appendChild(document.createTextNode(`Total Population of ${c1f} is ${populationOne}`));
                }
            })
            .catch(error => bootbox.alert('Please Select a Country'));
        event.preventDefault();
    });

    /* **************************************************** */

    /* 2. COUNTRY POPULATION TOTALS FOR A GIVEN AGE */

    // FORM TWO SUBMIT EVENT
    const formTwo = document.getElementById('formTwo');

    formTwo.addEventListener("submit", function (event) {
        const c2id = document.getElementById("countriesTwo");
        const age2id = document.getElementById("agesTwo");
        const ulTwo = document.getElementsByClassName("list-group-two")[0];
        // Change label text
        document.getElementById('countriesTwolbl').innerText = 'Country';
        document.getElementById('agesTwolbl').innerText = 'Age';
        // Remove list items
        while (ulTwo.firstChild) {
            ulTwo.removeChild(ulTwo.firstChild);
        }

        // Get Values from select option
        let c2 = c2id.value;
        let a2 = age2id.value;

        const url2 = `http://54.72.28.201:80/1.0/population/${yyyy}/${c2}/${a2}?format=json`;

        fetch(url2)
            .then(response => response.json())
            .then(data => {
                for (let i of Object.keys(data)) {
                    if (data.detail) {
                        bootbox.alert('Please Select both a Country value and an age value');
                    }

                    let females = data[i].females;
                    let males = data[i].males;
                    let total = data[i].females + data[i].males;
                    females = females.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    males = males.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    let c2f = c2.split("%20").join(" ");
                    for (let j = 0; j <= 2; j++) {
                        let liTwo = document.createElement("li");
                        ulTwo.appendChild(liTwo);
                        liTwo.classList.add("list-group-item");

                        if (j == 0) {
                            liTwo.appendChild(document.createTextNode(`Population of Females aged ${a2} living in ${c2f} is ${females}`));
                        } else if (j == 1) {
                            liTwo.appendChild(document.createTextNode(`Population of Males aged ${a2} living in ${c2f} is ${males}`));
                        } else {
                            liTwo.appendChild(document.createTextNode(`Total Population aged ${a2} living in ${c2f} is ${total}`));
                        }

                    }
                }
            })
            .catch(error => console.log("Please select both a country and age."));
        event.preventDefault();
    });

    /* **************************************************** */

    /* 3. LIFE EXPECTANCY CALCULATOR */

    // FORM THREE SUBMIT EVENT
    const formThree = document.getElementById('formThree');
    formThree.addEventListener("submit", function (event) {
        const c3id = document.getElementById("countriesThree");
        const age3id = document.getElementById("agesThree");
        const month3id = document.getElementById("monthsThree");
        const gender3id = document.getElementById("genderThree");
        const ulThree = document.getElementsByClassName("list-group-three")[0];
        // Change label text
        document.getElementById('countriesThreelbl').innerText = 'Country of Birth';
        document.getElementById('agesThreelbl').innerText = 'Age';
        document.getElementById('monthsThreelbl').innerText = 'Birth Month';
        document.getElementById('genderThreelbl').innerText = 'Gender';


        // Remove list items
        while (ulThree.firstChild) {
            ulThree.removeChild(ulThree.firstChild);
        }

        // Get Values from select option
        let c3 = c3id.value;
        let y3 = age3id.value;
        let m3 = month3id.value;
        const a3 = `${y3}y${m3}m`;
        let g3 = gender3id.value;

        if (c3 == 'Country of Birth' || y3 == 'Age in Years' || m3 == 'Month of Birth' || a3 == 'Choose Gender') {
            bootbox.alert('Please provide a country, an age, a month of Birth, and a gender.');
        }

        const url3 = `http://54.72.28.201:80/1.0/life-expectancy/remaining/${g3}/${c3}/${today}/${a3}/`;
        fetch(url3)
            .then(response => response.json())
            .then(data => {
                for (let i of Object.keys(data)) {
                    var rle = Math.round(data.remaining_life_expectancy);
                    var le = parseInt(y3) + rle;
                }
                for (let j = 0; j <= 1; j++) {
                    let liThree = document.createElement("li");
                    ulThree.appendChild(liThree);
                    liThree.classList.add("list-group-item");

                    if (j == 0) {
                        liThree.appendChild(document.createTextNode(`Life Expectancy is ${le} years.`));
                    } else {
                        liThree.appendChild(document.createTextNode(`Remaining Life Expectancy is ${rle} years.`));
                    }
                }
                if (c3 == 'Country of Birth' || y3 == 'Age in Years' || m3 == 'Month of Birth' || a3 == 'Choose Gender') {
                    console.log(ulThree.firstChild);
                    ulThree.removeChild(ulThree.firstChild);
                    ulThree.removeChild(ulThree.firstChild);
                }
            })
            .catch(error => bootbox.alert("Sorry, something went wrong!"));

        event.preventDefault();
    });
    /* **************************************************** */

    /* 4. YEARLY POPULATIONS FROM A GIVEN AGE AND COUNTRY */


    document.getElementById("currentYear").appendChild(document.createTextNode(yyyy)); // Add current year to subtitle

    let rowFour = document.getElementById("rowFour");

    // FORM FOUR SUBMIT EVENT
    const formFour = document.getElementById('formFour');
    formFour.addEventListener("submit", function (event) {

        var pieArrayYear = []; // year
        var pieArrayFemale = []; // females
        var pieArrayMale = []; // males
        var headerPieArray = ['Gender', 'Population'];

        var pieArrayA = [];
        var pieArrayB = [];
        var pieArrayC = [];
        var pieArrayD = [];
        var pieArrayE = [];
        var pieArrayF = [];
        var pieArrayG = [];
        var pieArrayH = [];
        var pieArrayI = [];
        var pieArrayJ = [];

        function createVariables() {
            var piesData = [];

            for (var i = 0; i <= 20; ++i) {
                piesData[i] = [];
                // console.log(piesData[i]);
            }
            piesData[7].push('a avlue');
            console.log('piesData7', piesData[7]);
            return piesData;
        }
        createVariables();

        // console.log(piesData[2]);

        // Remove table when form4 resubmitted
        if (rowFour.childNodes.length != 7) {
            rowFour.removeChild(rowFour.childNodes[7]);
        }

        // Input fields
        const c4id = document.getElementById("countriesFour");
        const age4id = document.getElementById("agesFour");

        // Get Values from select option
        let c4 = c4id.value;
        let a4 = age4id.value;

        // Delete Table
        if (c4 == 'Country of Birth' || a4 == 'Age in Years') {
            bootbox.alert('Please select both a country and an age.')
        }


        // Change label text
        document.getElementById('countriesFourlbl').innerText = 'Country';
        document.getElementById('agesFourlbl').innerText = 'Age';

        // Create Table and add classes
        let tblFour = document.createElement('table');
        const mq = window.matchMedia("(min-width: 768px)");
        if (window.matchMedia('(min-width: 640px)').matches) {
            tblFour.classList.add('table');
        } else {
            tblFour.classList.add('table-responsive');
        }

        // Insert thead into table
        tblFour.classList.add('table-bordered');
        let theadFour = tblFour.createTHead();
        let theadRowFour = theadFour.insertRow();
        theadRowFour.insertCell(0).appendChild(document.createTextNode('Year'));
        theadRowFour.insertCell(1).appendChild(document.createTextNode('Total Population'));
        theadRowFour.insertCell(2).appendChild(document.createTextNode('Female Population'));
        theadRowFour.insertCell(3).appendChild(document.createTextNode('Male Population'));
        let tbodyFour = tblFour.createTBody();
        rowFour.appendChild(tblFour);

        let y4 = yyyy;
        let arrlen = (yyyy - 1949) * 2;

        for (y4; y4 >= '1950'; y4--) {
            const url4 = `http://54.72.28.201:80/1.0/population/${y4}/${c4}/${a4}/?format=json`;
            fetch(url4)
                .then(response => response.json())

                .then(data => {
                    for (let i of Object.keys(data)) {

                        let fourMales = data[i].males;
                        let fourFemales = data[i].females;
                        let fourTotal = fourMales + fourFemales;
                        let fourYears = data[i].year;

                        fourTotal = fourTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        fourMalesF = fourMales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        fourFemalesF = fourFemales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        // Insert Data into tbody
                        let tbodyRows = tbodyFour.insertRow();
                        tbodyRows.insertCell().appendChild(document.createTextNode(data[i].year));
                        tbodyRows.insertCell().appendChild(document.createTextNode(fourTotal));
                        tbodyRows.insertCell().appendChild(document.createTextNode(fourFemalesF));
                        tbodyRows.insertCell().appendChild(document.createTextNode(fourMalesF));

                        // Insert Data into pie chart arrays
                        pieArrayYear.push(fourYears);
                        pieArrayFemale.push('Female', parseInt(fourFemales));
                        pieArrayMale.push('Male', parseInt(fourMales));


                        // function createVariables() {
                        //     var accounts = [];

                        //     for (var i = 0; i <= 20; ++i) {
                        //         accounts[i] = "whatever";
                        //         console.log(accounts[i])
                        //     }

                        //     return accounts;
                        // }



                        // let pay = pieArrayYear.length;
                        // let inc = 0;
                        // for (inc; inc <= pay; inc++) {
                        //     // console.log(pay);
                        //     // console.log('inc', inc);
                        //     // createVariables();
                        //     createVariables();
                        // }

                        // function createVariables() {
                        //     var piedArray = [];

                        //     for (var incnest = 0; incnest <= pay; ++incnest) {
                        //         console.log('createVaraibles');
                        //         // console.log(piedArray[incnest])
                        //         // var piedArray1 = piedArray[inc];
                        //         // piedArray1 = [];
                        //         // piedArray1.push(pay);
                        //         // console.log(pay);
                        //         // console.log(piedArray1);
                        //     }
                        //     return piedArray;

                        // }


                        if (pieArrayFemale.length == arrlen) {



                            // piecharta
                            pieArrayA.push(pieArrayFemale.slice(0, 2));
                            pieArrayA.push(pieArrayMale.slice(0, 2));
                            apie(pieArrayA, pieArrayYear);

                            // piechartb
                            pieArrayB.push(pieArrayFemale.slice(2, 4));
                            pieArrayB.push(pieArrayMale.slice(2, 4));
                            bpie(pieArrayB, pieArrayYear);

                            // piechartc
                            pieArrayC.push(pieArrayFemale.slice(4, 6));
                            pieArrayC.push(pieArrayMale.slice(4, 6));
                            cpie(pieArrayC, pieArrayYear);

                            // piechartd
                            pieArrayD.push(pieArrayFemale.slice(6, 8));
                            pieArrayD.push(pieArrayMale.slice(6, 8));
                            dpie(pieArrayD, pieArrayYear);

                            // piecharte
                            pieArrayE.push(pieArrayFemale.slice(8, 10));
                            pieArrayE.push(pieArrayMale.slice(8, 10));
                            epie(pieArrayE, pieArrayYear);

                            // piechartf
                            pieArrayF.push(pieArrayFemale.slice(10, 12));
                            pieArrayF.push(pieArrayMale.slice(10, 12));
                            fpie(pieArrayF, pieArrayYear);

                            // piechartg
                            pieArrayG.push(pieArrayFemale.slice(12, 14));
                            pieArrayG.push(pieArrayMale.slice(12, 14));
                            gpie(pieArrayG, pieArrayYear);

                            // piecharth
                            pieArrayH.push(pieArrayFemale.slice(14, 16));
                            pieArrayH.push(pieArrayMale.slice(14, 16));
                            hpie(pieArrayH, pieArrayYear);

                            // piecharti
                            pieArrayI.push(pieArrayFemale.slice(16, 18));
                            pieArrayI.push(pieArrayMale.slice(16, 18));
                            ipie(pieArrayI, pieArrayYear);

                            // piechartj
                            pieArrayJ.push(pieArrayFemale.slice(18, 20));
                            pieArrayJ.push(pieArrayMale.slice(18, 20));
                            jpie(pieArrayJ, pieArrayYear);
                        }
                    }

                })
                .catch(error => console.log('Both a country and an age value have not been submitted'));
        }

        // Add Header to pie arrays
        pieArrayA.unshift(headerPieArray);
        pieArrayB.unshift(headerPieArray);
        pieArrayC.unshift(headerPieArray);
        pieArrayD.unshift(headerPieArray);
        pieArrayE.unshift(headerPieArray);
        pieArrayF.unshift(headerPieArray);
        pieArrayG.unshift(headerPieArray);
        pieArrayH.unshift(headerPieArray);
        pieArrayI.unshift(headerPieArray);
        pieArrayJ.unshift(headerPieArray);

        console.log()

        event.preventDefault();
    });




    /* **************************************************** */
    //                  GOOGLE CHARTS                       //
    /****************************************************** */

    function apie(pieArrayA, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayA);

            var options = {
                title: pieArrayYear[0],
                is3D: true,
                sliceVisibilityThreshold: .2
            };

            var chart = new google.visualization.PieChart(document.getElementById('piecharta'));

            chart.draw(data, options);
        }
    }

    function bpie(pieArrayB, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayB);

            var options = {
                title: pieArrayYear[1]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartb'));

            chart.draw(data, options);
        }
    }

    function cpie(pieArrayC, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayC);

            var options = {
                title: pieArrayYear[2]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartc'));

            chart.draw(data, options);
        }
    }

    function dpie(pieArrayD, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayD);

            var options = {
                title: pieArrayYear[3]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartd'));

            chart.draw(data, options);
        }
    }

    function epie(pieArrayE, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayE);

            var options = {
                title: pieArrayYear[4]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piecharte'));

            chart.draw(data, options);
        }
    }

    function fpie(pieArrayF, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayF);

            var options = {
                title: pieArrayYear[5]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartf'));

            chart.draw(data, options);
        }
    }

    function gpie(pieArrayG, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayG);

            var options = {
                title: pieArrayYear[6]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartg'));

            chart.draw(data, options);
        }
    }

    function hpie(pieArrayH, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayH);

            var options = {
                title: pieArrayYear[7]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piecharth'));

            chart.draw(data, options);
        }
    }

    function ipie(pieArrayI, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayI);

            var options = {
                title: pieArrayYear[8]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piecharti'));

            chart.draw(data, options);
        }
    }

    function jpie(pieArrayJ, pieArrayYear) {

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pieArrayJ);

            var options = {
                title: pieArrayYear[9]
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechartj'));

            chart.draw(data, options);
        }
    }



    /* **************************************************** */

    /* 5. ALL COUNTRY POPULATIONS */

    // Initialise Google Chart Arrays
    var dataArray = [];
    var aDataArray = [];
    var bDataArray = [];
    var cDataArray = [];
    var dDataArray = [];
    var eDataArray = [];
    var fDataArray = [];
    var gDataArray = [];
    var hDataArray = [];
    var iDataArray = [];
    var jDataArray = [];
    var kDataArray = [];
    var lDataArray = [];
    var mDataArray = [];
    var nDataArray = [];
    var oDataArray = [];
    var pDataArray = [];

    // Header Info 
    var header = ['Country', 'Population'];

    // FORM-ONE SUBMIT EVENT
    const formFive = document.getElementById('formFive');
    formFive.addEventListener("submit", function (event) {

        /* Add each country name to an array */
        var countriesArray = [];
        let i;
        for (i = 0; i < c1id.length; i++) {
            countriesArray.push(c1id.options[i].value);
        }
        countriesArray.splice(0, 2);

        // list to display populations
        const ulFive = document.getElementsByClassName("list-group-five")[0];

        /* Make request for each countries population data */
        countriesArray.forEach(country => {
            country = country;
            const url5 = `http://54.72.28.201:80/1.0/population/${country}/${today}?format=json`;
            fetch(url5)
                .then(response => response.json())
                .then(data => {

                    /* Push each country name and total population into a new array.
                       Add data to list, format, and append.
                    */
                    for (let i of Object.keys(data)) {
                        var countryArray = [];
                        countryArray.push(country.split("%20").join(" "));
                        countryArray.push(data.total_population.population);
                        dataArray.push(countryArray);
                        let populationFive = data.total_population.population;
                        populationFive = populationFive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        let liFive = document.createElement("li");
                        ulFive.appendChild(liFive);
                        liFive.classList.add("list-group-item");
                        let c5 = country.split("%20").join(" ");
                        liFive.appendChild(document.createTextNode(`Total Population of ${c5} is ${populationFive}`));
                    }


                    /* If all population data is in array then -  
                       1. Add headers, 
                       2. Add Chart Data and 
                       3. Call functions to render charts.
                    */

                    if (dataArray.length > 208) {

                        // Remove Regions from dataArray
                        var indexRemove;
                        function findIndex(item) {
                            for (let i = 0; i < dataArray.length; i++) {
                                for (let j = 0; j < 2; j++) {
                                    if (dataArray[i][j] === item) {
                                        indexRemove = i;
                                        dataArray.splice(indexRemove, 1);
                                    }
                                }
                            }
                        }
                        findIndex('World');
                        findIndex('South America');
                        findIndex('Sub-Saharan Africa');


                        // aDataArray
                        aDataArray = dataArray.slice(0, 13);
                        aDataArray.unshift(header);
                        charta();
                        barCharta();

                        //  bDataArray
                        bDataArray = dataArray.slice(13, 26);
                        bDataArray.unshift(header);
                        chartb();
                        barChartb();

                        // cDataArray
                        cDataArray = dataArray.slice(26, 39);
                        cDataArray.unshift(header);
                        chartc();
                        barChartc();

                        // dDataArray
                        dDataArray = dataArray.slice(39, 52);
                        dDataArray.unshift(header);
                        chartd();
                        barChartd();

                        // eDataArray
                        eDataArray = dataArray.slice(52, 65);
                        eDataArray.unshift(header);
                        charte();
                        barCharte();

                        //  fDataArray
                        fDataArray = dataArray.slice(65, 78);
                        fDataArray.unshift(header);
                        chartf();
                        barChartf();

                        // gDataArray
                        gDataArray = dataArray.slice(78, 91);
                        gDataArray.unshift(header);
                        chartg();
                        barChartg();

                        // hDataArray
                        hDataArray = dataArray.slice(91, 104);
                        hDataArray.unshift(header);
                        charth();
                        barCharth();

                        // iDataArray
                        iDataArray = dataArray.slice(104, 117);
                        iDataArray.unshift(header);
                        charti();
                        barCharti();

                        //  jDataArray
                        jDataArray = dataArray.slice(117, 130);
                        jDataArray.unshift(header);
                        chartj();
                        barChartj();

                        // kDataArray
                        kDataArray = dataArray.slice(130, 147);
                        kDataArray.unshift(header);
                        chartk();
                        barChartk();

                        // lDataArray
                        lDataArray = dataArray.slice(147, 160);
                        lDataArray.unshift(header);
                        chartl();
                        barChartl();

                        // mDataArray
                        mDataArray = dataArray.slice(160, 173);
                        mDataArray.unshift(header);
                        chartm();
                        barChartm();

                        //  nDataArray
                        nDataArray = dataArray.slice(173, 186);
                        nDataArray.unshift(header);
                        chartn();
                        barChartn();

                        // oDataArray
                        oDataArray = dataArray.slice(186, 199);
                        oDataArray.unshift(header);
                        charto();
                        barCharto();

                        // pDataArray
                        pDataArray = dataArray.slice(199, 206);
                        pDataArray.unshift(header);
                        chartp();
                        barChartp();

                        // Add a border to the histograms
                        let all = document.getElementsByClassName('histogram');
                        for (var i = 0; i < all.length; i++) {
                            all[i].style.border = '1px solid black';

                            // Disable submit button
                            document.getElementById("btnFetch").disabled = true;

                        }
                    }
                })
                .catch(error => alert('Please Select a Country'));


        });
        event.preventDefault();

    });

    /* **************************************************** */
    //                  GOOGLE CHARTS                       //
    /****************************************************** */


    // Histogram A
    function charta() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(aDataArray);


            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-a'));
            chart.draw(data, options);
        }
    }

    // Bar Chart A
    function barCharta() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(aDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-a'));

            chart.draw(data, options);
        }
    }


    // Histogram B
    function chartb() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(bDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-b'));
            chart.draw(data, options);
        }
    }

    // Bar Chart B
    function barChartb() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(bDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-b'));

            chart.draw(data, options);
        }
    }


    // Histogram C
    function chartc() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(cDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-c'));
            chart.draw(data, options);
        }
    }
    // Bar Chart C
    function barChartc() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(cDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-c'));

            chart.draw(data, options);
        }
    }

    // Histogram D
    function chartd() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(cDataArray);

            var options = {
                title: "Population of Countries",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-d'));
            chart.draw(data, options);
        }
    }
    // Bar Chart D
    function barChartd() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(cDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-d'));

            chart.draw(data, options);
        }
    }

    // Histogram E
    function charte() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(eDataArray);
            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-e'));
            chart.draw(data, options);
        }
    }

    // Bar Chart E
    function barCharte() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(eDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-e'));

            chart.draw(data, options);
        }
    }

    // Histogram F
    function chartf() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(fDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-f'));
            chart.draw(data, options);
        }
    }

    // Bar Chart F
    function barChartf() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(fDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-f'));

            chart.draw(data, options);
        }
    }


    // Histogram G
    function chartg() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(gDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-g'));
            chart.draw(data, options);
        }
    }
    // Bar Chart G
    function barChartg() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(gDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-g'));

            chart.draw(data, options);
        }
    }

    // Histogram H
    function charth() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(hDataArray);

            var options = {
                title: "Population of Countries",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-h'));
            chart.draw(data, options);
        }
    }
    // Bar Chart H
    function barCharth() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(hDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-h'));

            chart.draw(data, options);
        }
    }

    // Histogram I
    function charti() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(iDataArray);


            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-i'));
            chart.draw(data, options);
        }
    }

    // Bar Chart I
    function barCharti() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(iDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-i'));

            chart.draw(data, options);
        }
    }

    // Histogram J
    function chartj() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(jDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-j'));
            chart.draw(data, options);
        }
    }

    // Bar Chart J
    function barChartj() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(jDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-j'));

            chart.draw(data, options);
        }
    }


    // Histogram K
    function chartk() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(kDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-k'));
            chart.draw(data, options);
        }
    }
    // Bar Chart K
    function barChartk() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(kDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-k'));

            chart.draw(data, options);
        }
    }

    // Histogram L
    function chartl() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(lDataArray);

            var options = {
                title: "Population of Countries",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-l'));
            chart.draw(data, options);
        }
    }
    // Bar Chart L
    function barChartl() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(lDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-l'));

            chart.draw(data, options);
        }
    }

    // Histogram M
    function chartm() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(mDataArray);


            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-m'));
            chart.draw(data, options);
        }
    }

    // Bar Chart M
    function barChartm() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(mDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-m'));

            chart.draw(data, options);
        }
    }

    // Histogram N
    function chartn() {
        // Google charts
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(nDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-n'));
            chart.draw(data, options);
        }
    }

    // Bar Chart N
    function barChartn() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(nDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-n'));

            chart.draw(data, options);
        }
    }

    // Histogram O
    function charto() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(oDataArray);

            var options = {
                title: "Population of Countires",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-o'));
            chart.draw(data, options);
        }
    }
    // Bar Chart O
    function barCharto() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(oDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-o'));

            chart.draw(data, options);
        }
    }

    // Histogram P
    function chartp() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(pDataArray);

            var options = {
                title: "Population of Countries",
                legend: { position: 'none' },
            };

            var chart = new google.visualization.Histogram(document.getElementById('histogram-p'));
            chart.draw(data, options);
        }
    }
    // Bar Chart P
    function barChartp() {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var data = google.visualization.arrayToDataTable(pDataArray);

            var options = {
                title: "Population of Countires",
                chartArea: { width: '100%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'Country'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('bar-p'));

            chart.draw(data, options);
        }
    }

} // window.onload
