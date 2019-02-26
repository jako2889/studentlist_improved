"use strict";

window.addEventListener("DOMContentLoaded", init);

//GLOBALE VARIABLER -------------------------------

let allStudents;
let postTarget = document.querySelector(".target");
let postOutput = document.querySelector(".output");
let house = "alle";

// EMPTY array som man kan manipulere med uden at påvirke json
const arrayOfStudents = [];

// PROTOTYPE OBJECT til det tomme array, hvor vi kan tilføje elementer uden at påvirke json
const Student = {
  fullname: "-full name-",
  house: "-house type-",
  firstname() {
   const letter = this.fullname.split(" ");
   return letter[0];
  },
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
  this.firstname();
  this.lastname();
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

// Kald displaylist, så man kan vise liste i innerhtml
 displayList(arrayOfStudents);
  // NOTE: Maybe also call SortbyFirst the first time... Investigate

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

// IF STATEMENTS til at enten vise hele listen eller den der er valgt - bruger foreach loop til at klone valgte houses 
if (houseData === "alle") {
  displayList(arrayOfStudents);
}else {
  let listShown = filterByHouse(houseData);
  displayList(listShown);
  
}

});

  });
}

function filterByHouse( house ) {
  console.log("filter");
  function filterHouse( element ) {
      return element.house === house;
  }

  return arrayOfStudents.filter( filterHouse );
}

// SORT BY LIST
function clickSortByFirst() {
  console.log("clickSortByFirst");
}

function sortByFirst() {
  console.log("sortByFirst");
}

// Her vises eleverne i et loop (for each) - parameter (students) modtages fra de calls med arrayByStudents & filtreret listshown
function displayList(students) {
  
  students.forEach(student => {
    console.log("student");
    let klon = postTarget.cloneNode(true).content;

    //klon.querySelector(".name").textContent = student.fullname;
    klon.querySelector(".name").textContent = student.firstname();
    klon.querySelector(".lastname").textContent = student.lastname();
    klon.querySelector(".house").textContent = student.house;
    klon.querySelector(".pic").src = "images/" + student.image() + ".png"; 

    postOutput.appendChild(klon);

  });

    }





