function checksubmit(e){
    if((e && e.keyCode == 13) || e == 0) {
        document.getElementById("textBox").submit
    }
}
function search(){
    //search functionality
    let listElem = document.getElementById("list");
    let listItems = document.getElementsByClassName("itemsFromList");
    let input = document.getElementById("textBox").value;
    input = input.toLowerCase()

    //check input
    noResults = true; 
    for (i = 0; i < listItems.length; i++){
        if (!listItems[i].innerHTML.toLowerCase().includes(input) || input === "") {
            listItems[i].style.display = "none";
            continue
        } else {
            listItems[i].style.display = "flex";
            noResults = false; 
        }
    }
    listElem.style.display = noResults ? "none" : "block";
}
function loadSearchData() {
    let searchItems = []
    fetch("recyclingitems.json")
        .then(response => response.json())
        .then(data => {
            searchItems = data;
            console.log(searchItems)})
        .then(x => {    //get the "list" HTML element
            let listElem = document.getElementById("list");
            // Add each data item as an <a> tag
            searchItems.forEach((item)=>{
                let b = document.createElement("button");
                b.innerText = item.Name;
                //add the class name
                b.classList.add("itemsFromList");
                // Add click event to navigate to result.html
                b.addEventListener("click", () => {
                    window.location.href = "result.html?q=" + item.identifier;
                });
                //add to list element
                listElem.appendChild(b);
            })
        })
        .catch(error => console.log(error));
  }