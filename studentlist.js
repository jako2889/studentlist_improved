"use strict";

window.addEventListener("DOMContentLoaded", init);

//GLOBALE VARIABLER -------------------------------

let allStudents;
let postTarget = document.querySelector(".target");
let postOutput = document.querySelector(".output");
//let house = "alle";
let houseData = "alle";
let filteredList;

// EMPTY array som man kan manipulere med uden at påvirke json
const arrayOfStudents = [];

// PROTOTYPE OBJECT til det tomme array, hvor vi kan tilføje elementer uden at påvirke json
const Student = {
  fullname: "-full name-",
  house: "-house type-",
  middlename() {
   const letter = this.fullname.split(" ");
   return letter[1];
  },
  lastname() {
   const letter = this.fullname.split(" ");
   return letter[letter.length - 1];
  },
  image() {
   const letter = this.fullname.split(" ");
   const firstnameLow = letter[0].toLocaleLowerCase();
   const firstnameFirstLetter = Array.from(firstnameLow[0]);
   const lastnameLow = letter[letter.length - 1].toLocaleLowerCase();

   
   return `${lastnameLow}_${firstnameFirstLetter}`;
   
  },
  setDATA(student) {
       // sæt prototype lig med json elementer    
  this.fullname = student.fullname;
  this.house = student.house;
  const letter = this.fullname.split(" ");

  this.firstname = letter[0];
  this.lastname = letter[letter.length - 1];
  this.image();
  }
}


// Kald getJson og filter house
function init() {
  console.log("init");

  getJson();
  housebuttonEventListener();
  
  

  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
}

// HENTER JSON OG KALDER CREATEPROTOTYPE
async function getJson() {
  console.log("getJson");

  // Hent JSON
  let jsonObject = await fetch("https://petlatkea.dk/2019/hogwarts/students.json");

  allStudents = await jsonObject.json();

  console.log(allStudents);

createPrototype(allStudents);
}

// FÅR PROTOTYPE AF JSON TIL NYT ARRAY
function createPrototype(allStudents) {

    // FOR EACH LOOP til hver student, der skal printes til eget array - PROTOTYPE
    
allStudents.forEach(student => {

  // CREATE Prototype object og lav til variable - Uppercase er prototype og lowercase student object
     let studentProto = Object.create(Student);
 
 // Tager funktionen/method fra min prototype array, der sætter data
 studentProto.setDATA(student);
 
 
  // PUSH TIL eget array med prototype   
  arrayOfStudents.push(studentProto);
     
 });

// Kald filterlist
 
 filterList(houseData);


}

// FUNCTION til at fjerne liste til filter
function clearList() {
  console.log("Clear list");
  postOutput.innerHTML = " ";
}

// FILTER til house
function housebuttonEventListener() {
  // EVENTLISTENER på alle
  document.querySelectorAll(".filter_knap").forEach(knap => {
knap.addEventListener("click", function() {
let houseData = this.getAttribute("data-house");

// FUNCTION THAT CLEARS INNER HTML OF OUTPUT
clearList();

// KALD FILTERLIST til at enten vise hele listen eller den der er valgt 
filterList(houseData);

  
});

  });
}
function filterList(houseData) {
  filteredList = filterByHouse(houseData);
  displayList(filteredList);
  sortByEventListener();

}

function filterByHouse( house ) {
  console.log("filter");
  function filterHouse( element ) {
    if (house === "alle") {
      return true;
    }else {
      return element.house === house;
    }
      
  }

  return arrayOfStudents.filter( filterHouse );
}
// SORT EVENT LISTENER
function sortByEventListener() {
    // EVENTLISTENER på alle
    document.querySelectorAll(".sort_knap").forEach(knap => {
      knap.addEventListener("click", function() {
      let sortData = this.getAttribute("data-sort");
      

      
      // KALD FILTERLIST til at enten vise hele listen eller den der er valgt 
      //filterList(houseData);
      if(sortData === "data-first") {
       let firstnameSort = filteredList.sort(SortByFirstName);


       clearList();

       displayList(firstnameSort);

      console.table(filteredList.sort(SortByFirstName));
      }else if(sortData === "data-last") {
        let lastnameSort = filteredList.sort(SortByLastName);

        clearList();

        displayList(lastnameSort);
      }
        
      });
    });

}


// SORT BY LIST
function SortByFirstName(a, b) {
  console.log("clickSortByFirst");
  if( a.firstname < b.firstname) {
    return -1;
}else {
    return 1;
}
}

function SortByLastName(a, b) {
  console.log("sortByFirst");
  if( a.lastname < b.lastname) {
    return -1;
}else {
    return 1;
}
}

// Her vises eleverne i et loop (for each) - parameter (students) modtages fra de calls med arrayByStudents & filtreret listshown
function displayList(students) {
  
  students.forEach(student => {
    console.log("student");
    let klon = postTarget.cloneNode(true).content;

    //klon.querySelector(".name").textContent = student.fullname;
    klon.querySelector(".name").textContent = student.firstname;
    klon.querySelector(".lastname").textContent = student.lastname;
    klon.querySelector(".house").textContent = student.house;
    klon.querySelector(".pic").src = "images/" + student.image() + ".png"; 

    klon.querySelector(".stud_wrapper").addEventListener("click",() => {
            
      visModal(student); 
  });  

    postOutput.appendChild(klon);

  });

    }

       //Funktioner til at vise og fjerne modal vinduet
       function visModal(student) {
         console.log("hej");
        modal.classList.add("vis");
        modal.querySelector(".name").textContent = student.firstname;
        modal.querySelector(".lastname").textContent = student.lastname;
        modal.querySelector(".pic").src = "images/" + student.image() + ".png"; 
        modal.querySelector(".pic").style.width = "30%";
        modal.querySelector(".close").addEventListener("click", skjulModal);
    }
    function skjulModal() {
        
        modal.classList.remove("vis");
    }     

