let myLibrary = [];

if(!localStorage.getItem("myLibrary")){
    myLibrary = [];
}
else{
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

showCards();
let last = -1;

function Book(bookName,author,pages,read) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages ; 
    this.read = read;
}
function showCards(){
    if(myLibrary.length > 0){
        for(let i = 0 ; i < myLibrary.length ; i++){
            if(i>last){
                createCard(myLibrary[i],i);
                last = i;
            }
        }
    }
}



function createCard(bookObj,number){
            let card = document.createElement("div");
            card.setAttribute("class","cardContainer");
            document.getElementById("container").appendChild(card);
            let nameBook = document.createElement("h5");
            nameBook.innerHTML = bookObj.bookName;
            document.getElementsByClassName("cardContainer")[number].appendChild(nameBook);
            let authorBook = document.createElement("h5");
            authorBook.innerHTML = bookObj.author;
            document.getElementsByClassName("cardContainer")[number].appendChild(authorBook);
            let countPage = document.createElement("h5");
            countPage.innerHTML = bookObj.pages;
            document.getElementsByClassName("cardContainer")[number].appendChild(countPage);
            let read = document.createElement("button");
            read.style.padding = "15px";
            read.setAttribute("id","isReadButton");
            read.addEventListener("click",function(){
                if(bookObj.read === true){
                    bookObj.read = false;
                    read.style.backgroundColor = "red";
                }
                else if(bookObj.read === false){
                    bookObj.read = true;
                    read.style.backgroundColor = "green";
                }
            })
            if(bookObj.read === true){
                read.style.backgroundColor = "green";
            }
            else{
                read.style.backgroundColor = "red";
            }
            document.getElementsByClassName("cardContainer")[number].appendChild(read);
           
}


document.getElementById("addBook").addEventListener("click",function(){
    const newBook = Object.create(Book);
    newBook.bookName = document.getElementsByClassName("formItem")[0].value;
    newBook.author = document.getElementsByClassName("formItem")[1].value;
    newBook.pages = document.getElementsByClassName("formItem")[2].value;
    if(document.querySelector('#cb').checked){
        newBook.read = true;
    }
    else{
        newBook.read = false;
    }
    
    let found = false;
    for(let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].bookName === newBook.bookName) {
            found = true;
            break;
        }
    }
    if(found === false){
        myLibrary.push(newBook);
        showCards();
        console.log(myLibrary);   
    }
    
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); 
})