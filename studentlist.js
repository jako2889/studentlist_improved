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

// EMPTY array expelled students
const arrayOfExpelled = [];

// UMBRIDGE JSON

let bloodlist;

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
  this.blood = checkBloodStatus(this.lastname);
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

  //HENT JSON TIL UMBRIDGE
  let jsonObjectUmbridge = await fetch("http://petlatkea.dk/2019/hogwarts/families.json");

  bloodlist = await jsonObjectUmbridge.json();

  console.log(bloodlist);

createPrototype(allStudents);
}

// CHECK BLOODLIST
function checkBloodStatus(lastname) {

  let halfList = bloodlist.half;
  let pureList = bloodlist.pure;

 // VARIABLE for bloodtype 
  let mud;
  let pure;
  let muggle;

//FOREACH loop for each student with the same lastname as bloodtype lastname IF STATEMENT
 halfList.forEach(bloodType => {

 if(lastname === bloodType) {
      console.log("Half",lastname);
      mud = "Mud-blood";
    } else {
      muggle = "Muggle";
    }
return mud || muggle;
  });
  pureList.forEach(bloodType => {

    if(lastname === bloodType) {
      console.log("Pure",lastname);
      pure = "Pure-blood";
    } else {
      muggle = "Muggle";
    }
return pure || muggle;
  });



// RETURN bloodtypes
  return mud || pure || muggle;


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
houseData = this.getAttribute("data-house");

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
  clearList();
  
  students.forEach(student => {

    let klon = postTarget.cloneNode(true).content;

    //klon.querySelector(".name").textContent = student.fullname;
    klon.querySelector(".name").textContent = student.firstname;
    klon.querySelector(".lastname").textContent = student.lastname;
    klon.querySelector(".house").textContent = student.house;
    klon.querySelector(".pic").src = "images/" + student.image() + ".png"; 
    klon.querySelector(".bloodStatus").textContent = student.blood;
    klon.querySelector(".bloodStatus").style.fontSize = "1.3em";
    klon.querySelector(".bloodStatus").style.fontWeight = "700";
    klon.querySelector(".bloodStatus").style.color = "red";
    console.log(student.blood);


   

    klon.querySelector(".stud_wrapper").addEventListener("click",() => {
            
      visModal(student); 
  });  

    postOutput.appendChild(klon);

  });

    }

  function clickExpel( event ) {
      // TODO: Figure out if a button was clicked
  console.log(event);
  if(event.target.dataset.action === "remove") {
      console.log("button was clicked");
      expelStudent(event);
  }
  

  }
  function expelStudent( event ) {
    console.log("Her er event",event);
    // TODO: Figure out which element should be removed
    let findStudent = event.target.dataset.firstname;

    console.log(findStudent);
    let indexStudent = arrayOfStudents.findIndex(student => student.firstname === findStudent);
    
    console.log("Index of student",indexStudent);


    // TODO: Find the element index in the array

    // TODO: Splice that element from the array
    let RemovedStudent = arrayOfStudents.splice(indexStudent, 1);
    arrayOfExpelled.push(...RemovedStudent);
    console.log(arrayOfExpelled);

    // Count each expelled student
    const counts = {
      Gryffindor: 0,
      Slytherin: 0,
      Hufflepuff: 0,
      Ravenclaw: 0
    };
    arrayOfExpelled.forEach(student => {
      counts[student.house]++;
    });
    console.log(counts.Ravenclaw);

    let ravenclawRemoved = counts.Ravenclaw;
    let gryffindorRemoved = counts.Gryffindor;
    let hufflepuffRemoved = counts.Hufflepuff;
    let slytherinRemoved = counts.Slytherin;



// Tilføj dem til siden
   document.querySelector(".ravenclawExpel").textContent = "Ravenclaw: " + ravenclawRemoved;
   document.querySelector(".gryffindorExpel").textContent = "Gryffindor: " + gryffindorRemoved;
   document.querySelector(".hufflepuffExpel").textContent = "Hufflepuff: " + hufflepuffRemoved;
   document.querySelector(".slytherinExpel").textContent = "Slytherin: " + slytherinRemoved;

    skjulModal();

    // Re-display the list
    
    displayList(arrayOfStudents);
}


       //Funktioner til at vise og fjerne modal vinduet
       function visModal(student) {
         console.log("hej");
        modal.classList.add("vis");
        modal.querySelector(".name").textContent = student.firstname;
        modal.querySelector(".lastname").textContent = student.lastname;
        modal.querySelector(".pic").src = "images/" + student.image() + ".png"; 
        modal.querySelector(".pic").style.width = "30%";
        modal.querySelector(".expel").dataset.firstname = student.firstname;


            // register Expel-button
            modal.querySelector("#modal-content").addEventListener("click", clickExpel);

        

        modal.querySelector(".close").addEventListener("click", skjulModal);

       if (student.house === "Hufflepuff") {
         console.log("hufflepuff");
         modal.querySelector("#modal-content").classList.add("hufflepuff");
       }else if(student.house === "Gryffindor") {
         console.log("gryffindor");
        modal.querySelector("#modal-content").classList.add("gryffindor");
       }else if(student.house === "Ravenclaw") {
        modal.querySelector("#modal-content").classList.add("ravenclaw");
       }else if(student.house === "Slytherin") {
        modal.querySelector("#modal-content").classList.add("slytherin");
       }

    }
    function skjulModal() {
      modal.querySelector("#modal-content").classList.remove("slytherin");
      modal.querySelector("#modal-content").classList.remove("ravenclaw");
      modal.querySelector("#modal-content").classList.remove("gryffindor");
      modal.querySelector("#modal-content").classList.remove("hufflepuff");
        
        modal.classList.remove("vis");
    }     


    // Inquisitorial squad use boolean to check if they should have a status
