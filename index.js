
const app = document.getElementById('app');

let sort = "asc"
let limit = 100
let filter = false
let year = 0
let category = "all"

async function getData(url) {
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
  document.getElementById("app").innerHTML = "<img src='spinner2.svg'>"
  let data = await getData(url);
  document.getElementById("app").innerHTML = ""

  
  for (var l of data.nobelPrizes) {
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

  }
}

async function get_prize(category, year) {
  let url = `https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}`
  console.log(url)
  document.getElementById("more_data").style.transform = "translateY(0)"
  document.getElementById("more_content").innerHTML = ""
  let data = await getData(url);

  const item = document.createElement("div");
  item.classList.add("item")
  const lar = get_laureates(data[0].laureates);
  document.getElementById("more_content").innerHTML = `<div class="more_data"> \
                        <h2>${data[0].categoryFullName.en}</h2> \
                        <h3>${year}</h3> \
                        <hr> \
                        <h4>Laureates</h4>
                        ${lar.outerHTML} \
                        <h4>Prize amount</h4> \
                        ${data[0].prizeAmount}$ (${data[0].prizeAmountAdjusted}$ adjusted for inflation)
                      </div>`

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