"use strict";

var formular = {
    init: function () {
        formular.createForm();
    },
    createForm: function () {
        var formular = document.getElementById("formular");
        var form = document.createElement("form");
        form.method = "POST";
        form.action = "login.php";
        formular.appendChild(form);

        var row1 = document.createElement("div");
        row1.className = "row";
        var div1 = document.createElement("div");
        div1.className = "large-4 columns";
        var firstName = document.createElement("label");
        firstName.textContent = "Förnamn:";
        firstName.htmlFor = "fornamn";
        firstName.className = "left inline";
        var input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Ditt förnamn";
        input1.id = "fornamn";

        form.appendChild(row1);
        row1.appendChild(div1);
        div1.appendChild(firstName);
        div1.appendChild(input1);

        var row2 = document.createElement("div");
        row2.className = "row";
        var div2 = document.createElement("div");
        div2.className = "large-4 columns";
        var lastName = document.createElement("label");
        lastName.textContent = "Efternamn:";
        lastName.htmlFor = "efternamn";
        lastName.className = "left inline";
        var input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "Ditt efternamn";
        input2.id = "efternamn";


        form.appendChild(row2);
        row2.appendChild(div2);
        div2.appendChild(lastName);
        div2.appendChild(input2);

        var row3 = document.createElement("div");
        row3.className = "row";
        var div3 = document.createElement("div");
        div3.className = "large-4 columns";
        var postNummer = document.createElement("label");
        postNummer.textContent = "Postnummer:";
        postNummer.htmlFor = "postnummer";
        postNummer.className = "left inline";
        var input3 = document.createElement("input");
        input3.type = "text";
        input3.placeholder = "ex. 392 34";
        input3.id = "postnummer";


        form.appendChild(row3);
        row3.appendChild(div3);
        div3.appendChild(postNummer);
        div3.appendChild(input3);

        var row4 = document.createElement("div");
        row4.className = "row";
        var div4 = document.createElement("div");
        div4.className = "large-4 columns";
        var email = document.createElement("label");
        email.textContent = "Email:";
        email.htmlFor = "email";
        email.className = "left inline";
        var input4 = document.createElement("input");
        input4.type = "email";
        input4.placeholder = "ex. 123@abc.com";
        input4.id = "email";


        form.appendChild(row4);
        row4.appendChild(div4);
        div4.appendChild(email);
        div4.appendChild(input4);

        var row5 = document.createElement("div");
        row5.className = "row";
        var div5 = document.createElement("div");
        div5.className = "large-4 columns";
        var lPrismodell = document.createElement("label");
        lPrismodell.textContent = "Prismodell:";
        lPrismodell.className = "left inline";
        var prismodell = document.createElement("select");
        prismodell.id = "prismodell";
        var opt1 = document.createElement("option");
        opt1.value = "låg";
        opt1.textContent = "Låg";
        var opt2 = document.createElement("option");
        opt2.value = "mellan";
        opt2.textContent = "Mellan";
        var opt3 = document.createElement("option");
        opt3.value = "hög";
        opt3.textContent = "Hög";

        form.appendChild(row5);
        row5.appendChild(div5);
        div5.appendChild(lPrismodell);
        div5.appendChild(prismodell);
        prismodell.appendChild(opt1);
        prismodell.appendChild(opt2);
        prismodell.appendChild(opt3);

    },


};
window.onload = formular.init;