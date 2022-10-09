// chrome://extensions/
/* 
//this is how to convert a string to an array.

let myLeads = `["https://www.w3schools.com"]`;
myLeads = JSON.parse(myLeads);
myLeads.push("https://www.youtube.com");
console.log(myLeads);
*/


/*
// this is how to convert an array to a string.

let myLeads = ["https://www.youtube.com"];
console.log(typeof myLeads);
myLeads = JSON.stringify(myLeads);
console.log(myLeads);
console.log(typeof myLeads);
*/

const inputBtn = document.querySelector('#input-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-El');
const deleteBtn = document.querySelector('#delete-btn');
const tabBtn = document.querySelector('#tab-btn');

let myLeads =[];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads){
    let listItems = "";
    for( let i = 0; i < leads.length; i += 1){
        
        listItems += 
        `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
        /*
        // what happens inside:
        // 1.create an element
        const li = document.createElement("<li>");
        // 2.set text Content
        li.textContent = myLeads[i];
        // 3.append to unordered list
        ulEl.append(li);*/

    }
    ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function(){
    //Grab the url
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        myLeads.push(tabs[0].url);

        localStorage.setItem("myLeads", JSON.stringify(myLeads));

        render(myLeads);

    });
    
});

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function(){

    myLeads.push(inputEl.value);
    inputEl.value = "";
    
    //saving the data from the input to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
    render(myLeads);
});



