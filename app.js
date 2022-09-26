var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
var time = new Date();
var t = document.getElementById("attText").innerText = "Last updated on " + utc + " at " + time.getHours() + ":" + time.getMinutes();

const searchButton = document.getElementById('main-search-button');
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})
searchButton.addEventListener('click', (event) => {
    if (searchInput.value == "") {
        var safe = document.getElementById("safeSide");
        safeside.innerText = "Enter a valid Netra ID!";
    }
    else {
        var safe = document.getElementById("safeSide");
        safeside.innerText = "";
        const inputValue = searchInput.value;
        help(inputValue)
    }

});
function put(y, x) {
    console.log(y);
    if (y == 0) {

        x.innerHTML = "<span>&#10060;</span>"
        x.style.padding = "0px"
    }
    else if (y == 1) {
        x.innerHTML = "<span>&#9989;</span>"
        x.style.padding = "0px"
    }
    else {
        x.innerHTML = "<span>&#8413;</span>"
        x.style.padding = "3px"

    }
}

function coloursetter() {
    let prgress = document.getElementById("progress")
    const y = progress.style.width
    if (y >= "75") {
        progress.style.backgroundColor = "green"
        // progress.style.color="white"
    }
    else if (y > "45" && y < "75") {
        progress.style.backgroundColor = "#FFA701"
        // progress.style.color="black"
    }
    else {
        progress.style.backgroundColor = "red"
    }

}



function setter(obj) {
    const a = document.getElementById("1")
    const b = document.getElementById("2")
    const c = document.getElementById("3")
    const d = document.getElementById("4")
    const e = document.getElementById("5")
    const f = document.getElementById("6")
    const g = document.getElementById("7")

    put(obj.session1, a)
    put(obj.session2, b)
    put(obj.session3, c)
    put(obj.session4, d)
    put(obj.session5, e)
    put(obj.session6, f)
    put(obj.session7, g)

}

async function help(s) {
    const url = "http://teleuniv.in/netra/api.php"
    const dat = {
        "method": "314",
        "rollno": s
    }
    const fat = {
        "method": "32",
        "rollno": s
    }

    let da = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(dat)


    }).then((res) => res.json()).then(
        (data) => {
            console.log(data)
            return data
        })
    console.log(da)
    var l = da.attandance.dayobjects[0].sessions
    console.log(l)

    var overall = da.overallattperformance.totalpercentage
    console.log(overall)

    let fa = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(fat)

    }).then((res) => res.json()).then(
        (data) => {
            d = data
            console.log(data)
            return data
        })
    console.log(fa.firstname);
    if (fa.firstname == undefined) {
        var safe = document.getElementById("safeSide");
        safeside.innerText = "Enter a valid Netra ID!";

    }
    else {
        document.getElementById("card").style.display = "flex"

        let name = document.getElementById("name")
        name.innerText = fa.firstname;
        console.log(fa.picture)
        let img = document.getElementById("img")
        img.src = fa.picture

        let prgress = document.getElementById("progress")
        progress.style.width = overall + "%"
        coloursetter();
        prgress.innerHTML = overall + "%"
        progress.style.color = "black"
        setter(l);


    }



}


