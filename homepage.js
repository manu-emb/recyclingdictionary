function checksubmit(e){
    if((e && e.keyCode == 13) || e == 0) {
        document.getElementById("textBox").submit
    }
}
function search(isTextBox){
    //search functionality
    let listElem = document.getElementById("list");
    let listItems = document.getElementsByClassName("itemsFromList");

    //since homepage.js is reused, assign input based on if we are on home page or results page
    let input = null
    if (isTextBox){
        input = document.getElementById("textBox").value;
    } else {
        input = document.getElementById("query").innerText;
    }
    input = input.toLowerCase()
    searchTerm = input.split(" ").map(term => term.trim()).filter(term => term !== "" && term !== "and" && term !== "of" && term !== "the");
    //check input
    let noResults = true; 
    let limit = 8; //limit for search results
    let resultCounter = 0;
    for (i = 0; i < listItems.length; i++){
        // Check if any of the search terms are present in the name or alias
        let matches = searchTerm.every(term => 
            listItems[i].dataset.alias.toLowerCase().includes(term)
        );
        if (!matches || input === "") {
            listItems[i].style.display = "none";
            continue
        } else if (resultCounter < limit | !isTextBox){
            listItems[i].style.display = "flex";
            noResults = false;
            resultCounter++;
            console.log(resultCounter);
        }
    }
    listElem.style.display = noResults ? "none" : "flex";
}
function loadSearchData(preview) {
    let searchItems = []
    fetch("recyclingitems.json")
        .then(response => response.json())
        .then(data => {
            searchItems = data;
            //console.log(searchItems)
        })
        .then(x => {    //get the "list" HTML element
            let listElem = document.getElementById("list");
            // Add each data item as an <a> tag
            searchItems.forEach((item)=>{
                let b = document.createElement("button");
                b.innerText = item.name;
                if (item.alias == null){
                    b.dataset.alias = item.name;
                } else {
                    b.dataset.alias = item.alias;
                }
                //initialize with not being displayed
                b.style.display = "none";
                //add the class name
                b.classList.add("itemsFromList");
                // Add click event to navigate to result.html
                b.addEventListener("click", () => {
                    window.location.href = "result.html?q=" + item.identifier;
                });
                //add to list element
                listElem.appendChild(b);
            })
            if (preview == true){
                search(IsTextBox = false);
            }
        })
        .catch(error => console.log(error));
  }