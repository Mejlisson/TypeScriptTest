let userName;

document.getElementById("mySubmit").onclick = function() {
    userName = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${userName}`

}


/*Type conversion
let age = window.prompt("your age?");
age = Number(age);
age + 1;
console.log(age);  //Följande kommer logga addition + 1 till user input *
/