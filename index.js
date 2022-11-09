//////////////
// we have a basic skeleton here to help you start.
// if you dont want to use it you dont have to -
// just clear the file and start from scratch
//////////////

// notice in our html we have a node with ID "app"
// hint: use this reference later to inject data into your page
const app = document.getElementById('app');

let sort = "asc"
let limit = 100
let filter = false
let year = 0
let category = "all"

async function getData(url) {
  // write you logic for getting the data from the API here
  // return your data from this function
  const response = await fetch(url);
  return response.json(); 
}

function get_laureates(laureates) {
  const lar = document.createElement("ul")
  if (!laureates) {
    return lar
  }
  for (var w of laureates) {
    const i = document.createElement("li")
    if (w.knownName) {
      i.innerText = w.knownName.en
    } else if (w.fullName) {
      i.innerText = w.fullName.en
    } else if (w.orgName) {
      i.innerText = w.orgName.en
    } else {
      console.log(w)
    }
    lar.appendChild(i)
  }
  return lar
}

async function render() {
  let url = `https://api.nobelprize.org/2.1/nobelPrizes?limit=${limit}&sort=${sort}`
  if (year != 0) {
    url += `&nobelPrizeYear=${year}`
  }
  if (category != "all") {
    url += `&nobelPrizeCategory=${category}`
  }
  console.log(url)
  let data = await getData(url);
  // you have your data! add logic here to render it to the UI
  // notice in the HTML file we call render();
  document.getElementById("app").innerHTML = ""
  for(var l of data.nobelPrizes) {
    let year = l.awardYear
    let category = l.category.en
    let link = l.links[0].href

    const lar = get_laureates(l.laureates);
    
    const item = document.createElement("div");
    item.classList.add("item")
    item.innerHTML = `<div class="data" onclick="get_prize('${category.toLowerCase().substring(0, 3)}', ${year})"> \
                        <h2>${category}</h2> \
                        <h3>${year}</h3> \
                        <hr> \
                        ${lar.outerHTML} \
                      </div>`
    
    app.appendChild(item)

    //console.log(l)
  }
}

async function get_prize(category, year) {
  let url = `https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}`
  console.log(url)
  let data = await getData(url);
  console.log(data)
  // you have your data! add logic here to render it to the UI
  // notice in the HTML file we call render();
  const item = document.createElement("div");
  item.classList.add("item")
  const lar = get_laureates(data[0].laureates);
  document.getElementById("more_content").innerHTML = `<div class="more_data" onclick="render()"> \
                        <h2>${data[0].categoryFullName.en}</h2> \
                        <h3>${year}</h3> \
                        <hr> \
                        <h4>Laureates</h4>
                        ${lar.outerHTML} \
                        <h4>Prize amount</h4> \
                        ${data[0].prizeAmount}$ (${data[0].prizeAmountAdjusted}$ adjusted for inflation)
                      </div>`

  document.getElementById("more_data").style.transform = "translateY(0)"  

}

async function search(keyword) {
  keyword = keyword.toLowerCase()
  //console.log(keyword)
  cards = document.getElementById("app").children
  //console.log(cards)

  for (var c of cards) {
    var cat = c.children[0].innerText
    //console.log(cat)
    if(cat.toLowerCase().includes(keyword)) {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  }
}

 async function open_nobel(link) {
  console.log(link)
  const response = (await fetch(link)).json();
  console.log(response)
}

function change_order(val) {
  console.log(val);
  sort = val ? "desc" : "asc"
  render()
}

function update_limit(val) {
  console.log(val)
  limit = val;
  render()
}



// document.getElementById("filter_apply_but").addEventListener("click", function contactClickhandler(el) {
//   filter = true
//   document.getElementById("year_picker").value
//   document.getElementById("cat_picker").value.toLowerCase().substring(0, 3)
//   // url = `https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}?limit=${limit}&sort=${sort}`
//   console.log(`filter by ${category}, ${year}`)
//   render()
// });

function update_year(val) {
  console.log(val)
  year = val;
  render()
}

function update_category(val) {
  category = val.toLowerCase().substring(0, 3);
  console.log(category)
  render()
}

document.getElementById("more_data").addEventListener("click", function contactClickhandler(el) {
  document.getElementById("more_data").style.transform = "translateY(-100vh)"
});