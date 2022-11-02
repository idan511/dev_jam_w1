//////////////
// we have a basic skeleton here to help you start.
// if you dont want to use it you dont have to -
// just clear the file and start from scratch
//////////////

// notice in our html we have a node with ID "app"
// hint: use this reference later to inject data into your page
const app = document.getElementById('app');

async function getData(url) {
  // write you logic for getting the data from the API here
  // return your data from this function
  const response = await fetch(url);
  return response.json(); 
}

async function render() {
  url = "https://api.nobelprize.org/2.1/nobelPrizes"
  data = await getData(url);
  // you have your data! add logic here to render it to the UI
  // notice in the HTML file we call render();
  for(var l of data.nobelPrizes) {
    var year = l.awardYear
    var category = l.category.en
    var link = l.links[0].href
    const lar = document.createElement("ul");
    for (var w of l.laureates) {
      //console.log(w.fullName.en)
      const i = document.createElement("li");
      if (w.knownName) {
        i.innerText = w.knownName.en
      } else if (w.fullName) {
        i.innerText = w.fullName.en
      } else if (w.orgName) {
        i.innerText = w.orgName.en
      } else {
        console.log(w)
      }
      lar.appendChild(i);
      
    }
    const item = document.createElement("div");
    item.classList.add("item")
    item.innerHTML = `<div class="data"> \
                        <h2>${category}</h2> \
                        <h3>${year}</h3> \
                        <hr> \
                        ${lar.outerHTML} \
                      </div>`
    
    document.getElementById("app").appendChild(item)

    //console.log(l)
  }
}
