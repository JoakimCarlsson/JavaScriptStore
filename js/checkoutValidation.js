
//This is a very basic validation form, we use it too confirm that the user have entered all values properly.
//If the user have entered everything proplery he can submit and then go to confirmation.html
//TODO, FIX ME. :) 
function validateForm() {
    let name = document.forms["checkoutForm"]["name"].value;
    let address = document.forms["checkoutForm"]["address"].value;
    let phoneNumber = document.forms["checkoutForm"]["phoneNumber"].value;

    console.log(address);

    if (name === "") {
        document.getElementById("nameValidation").innerHTML = "Name Is Requierd";
        return false;
    }
    if (hasNumber(name)) {
        document.getElementById("nameValidation").innerHTML = "Name can't contain numbers";
        return false;
    }
    if (hasSpecialCharacter(name)) {
        document.getElementById("nameValidation").innerHTML = "Name can't contain special characters";
        return false;
    }
    if (hasSpecialCharacter(address)) {
        document.getElementById("addressumberValidation").innerHTML = "Address can't contain special characters";
        return false;
    }
    if (hasSpecialCharacter(phoneNumber)) {
        document.getElementById("phoneNumberValidation").innerHTML = "Number can't contain special characters";
        return false;
    }
    else {
        return true;
    }
}
function hasSpecialCharacter(myString) {
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(myString);
}
function hasNumber(myString) {
    return /\d/.test(myString);
}