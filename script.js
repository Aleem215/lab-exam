let state = [];
//function to draw table
function drawTable(records){
  let html='';
  let result = document.querySelector('#result');
  
  for(let rec of records){
    html+=`<tr>
     <td>${rec.name}</td>
     <td>${rec.tagline}</td>
     <td> <img src="${rec.image_url}"></td>
     <td>${rec.description}</td>
     <td><button onclick="viewDetails('${rec.food_pairing}')">View Details</button>
     </td>
   </tr>`;
   
  }

  result.innerHTML = html;

}

//function to get data from punkapi
async function getData(){
  const response = await fetch('https://api.punkapi.com/v2/beers');
  const data = await response.json();
  return data.slice(0,50);
  
}
async function showallbeers(){
    state = await getData();
    drawTable(state);
}
showallbeers();

//function to search a specific beer
function search(){
  
  let searchKey = document.querySelector('#searchKey').value;
  let results = [];

  for(let rec of state){

   let searchText = rec.name.toUpperCase();
    searchKey = searchKey.toUpperCase();

   
    if ( searchText.search(searchKey) !== -1 ){
      results.push(rec);
    }

    drawTable(results);
  }
}
 function nameCompare(x, y){
  return x.name.localeCompare(y.name);
}

//function to sort beers in alphabetical order
function sortByName(){
  let result = state.sort(nameCompare);
  drawTable(result);
}

//function to show details(food pairings)
function viewDetails(foodpairing){

  let record = [];
  let result = document.querySelector('#fp');
  let html = '';
  html+=foodpairing;
  result.innerHTML = html;
}

//funtion to filter beers by alcohol percentage
function filterbyabv(abv){

  let filtered = []; 
  for(let rec of state){
    if (rec.abv=== abv)
      filtered.push(rec);
  }
  drawTable(filtered);
}
