"use strict";

var validateForm = {
    ifName: document.getElementById("fornamn"),
    ilName: document.getElementById("efternamn"),
    ipNum: document.getElementById("postnummer"),
    iEmail: document.getElementById("epost"),
    noErrors: false,
    error: true,
    formular: document.forms[0],
    regex: {
        fornamn: /^[a-zA-Z]+$/,
        efternamn: /^[a-zA-Z]+$/,
        epost: /^(?!\.)(\w|-|\.){1,64}(?!\n)@(?!\.)[-.a-zåäöA-ZÅÄÖ0-9]{4,253}$/,
        postnummer: /^((\d{5})|(\d{3}(\-|\ )\d{2}))|((SE|SE\ )(\d{3}((\ |\-)\d{2})|\d{5}))$/,
    },
    init: function () {
        validateForm.validateInput(validateForm.ifName);
        validateForm.validateInput(validateForm.ilName);
        validateForm.validateInput(validateForm.ipNum);
        validateForm.validateInput(validateForm.iEmail);
        var skicka = document.getElementById("skicka");
        skicka.onclick = function () { validateForm.confirmSubmit(); }
    },
    validateInput: function (x) {
        var ident = document.getElementById("fel" + x.id);
        var identEx;       
        for (var i in this.regex){
            if (i === x.id) {
                identEx = this.regex[i];
            }
        }
        x.onblur = function () {    
            if (x.value.search(identEx) === -1) {               
                ident.className = "fel show";
                validateForm.error = true;
                validateForm.noErrors = false;
            } else {             
                ident.className = "fel hidden";
                validateForm.error = false;
                validateForm.noErrors = true;
                if (x.id === "postnummer") { 
                    var pnReg = /^\d{5}$/;
                    if (pnReg.test(x.value.replace(/[^0-9]/g, "")) === true) {
                        x.value = x.value.replace(/[^0-9]/g, "");
                    }
                }
            }
        }
    },
    confirmSubmit: function () {        
        this.checkForErrors();
        if (this.noErrors && !validateForm.error) {
            var skugga = document.getElementById("skugga");
            var confirmBox = document.getElementById("popBekraftelse");
            var btnSend = document.getElementById("bestallning");
            skugga.className = "show";
            confirmBox.className = "show";
            document.getElementById("firstname").textContent = validateForm.ifName.value;
            document.getElementById("fName").textContent = validateForm.ifName.name;

            document.getElementById("lastname").textContent = validateForm.ilName.value;
            document.getElementById("lName").textContent = validateForm.ilName.name;

            document.getElementById("postal").textContent = validateForm.ipNum.value;
            document.getElementById("pNumb").textContent = validateForm.ipNum.name;

            document.getElementById("email").textContent = validateForm.iEmail.value;
            document.getElementById("iPost").textContent = validateForm.iEmail.name;

            document.getElementById("pricemodel").textContent = document.getElementById("select").value;
            document.getElementById("abort").onclick = function () {
                skugga.className = "hide";
                confirmBox.className = "hide";
            }
            document.getElementById("confirmBuy").onclick = function () {                
                btnSend.submit();
            }
        } 
    },
    checkForErrors: function () {
        var element = [validateForm.ifName, validateForm.ilName, validateForm.ipNum, validateForm.iEmail];
        for (var i = 0; i < 4; i++) {
            if (element[i].value === "") {
                var dispErr = document.getElementById("fel" + element[i].id);
                dispErr.className = "fel show";
                return this.noErrors = false;
            } 
        }
    }
};
window.onload = validateForm.init;