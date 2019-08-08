// const c1id = document.getElementById("countriesOne");

var countriesArray = [];
var i;
for (i = 0; i < c1id.length; i++) {
    countriesArray.push(c1id.options[i].value);
}
countriesArray.splice(0, 2);

// list to display results
const ulFive = document.getElementsByClassName("list-group-five")[0];
// Change label text
// document.getElementById('countriesOnelbl').innerText = 'Country';
// Remove list items
// while (ulOne.firstChild) {
//     ulOne.removeChild(ulOne.firstChild);
// }

// Get Value from select option
// var c1 = c1id.value;
countriesArray.forEach(country => {
    country = country;
    const url5 = `http://54.72.28.201:80/1.0/population/${country}/${today}?format=json`;

    // Get data for Population Totals
    fetch(url5)
        .then(response => response.json())
        .then(data => {

            // console.log(data.total_population.population);


            // console.log(dataArrray);
            for (let i of Object.keys(data)) {
                var countryArray = [];
                countryArray.push(country);
                // console.log(data.total_population.population);

                countryArray.push(data.total_population.population);
                // console.log(countryArray);
                dataArray.push(countryArray);

                let populationFive = data.total_population.population;
                populationFive = populationFive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                let liFive = document.createElement("li");
                ulFive.appendChild(liFive);
                liFive.classList.add("list-group-item");
                let c5 = country.split("%20").join(" ");
                liOne.appendChild(document.createTextNode(`Total Population of ${c5} is ${populationFive}`));
            }

        })

        .catch(error => alert('Please Select a Country'));

});