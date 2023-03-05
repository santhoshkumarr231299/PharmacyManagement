
export function validateUsername(field) {
    if(!field || field.length == 0) {
        return "Username should not be empty";
    }
    else if(field.length < 6)
    {
        return "Username should have more than 5 letters";
    }
    else {
        return "";
    }
}

export function validatePassword(field) {
    if(!field || field.length == 0) {
        return "Password should not be empty";
    }
    else if(field.length < 6)
    {
        return "Password should have more than 5 letters";
    }
    else {
        var lowerCaseLetters = /[a-z]/g;
        if(!field.match(lowerCaseLetters)) {  
            return "Password should contain a Lower Case";
        }
        
        var upperCaseLetters = /[A-Z]/g;
        if(!field.match(upperCaseLetters)) {  
            return "Password should contain a Upper Case";
        }

        var numbers = /[0-9]/g;
        if(!field.match(numbers)) {  
            return "Password should contain a number";
        }

    }
}

export function validateAdddress(field) {
    if(!field || field.length == 0) {
        return "Address should not be empty";
    }
    else if(field.length < 6)
    {
        return "Address should have more than 8 letters";
    }
    else {
        return "";
    }
}

export function validatePhoneNumber(field) {
    if(!field || field.length == 0) {
        return "Phone Number should not be empty";
    }
    else if(field.length < 8 || 15 < field.length)
    {
        return "Enter a valid phone number";
    }
    else {
        return "";
    }
}

export function validateEmail(field) {
    var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!field || field.length == 0) {
        return "Email should not be empty";
    }
    else if(!field.match(mailPattern)) {
        return "Enter a valid Email";
    }
    else {
        return "";
    }
}

export function validatePharmacyName(field) {
    if(!field || field.length == 0) {
        return "Pharmacy Name should not be empty";
    }
    else if(field !== field.toLowerCase()) {
        return "Pharmacy Name should only contain Lower Case Letters";
    }
    else {
        return "";
    }
}

export function validateQuantity(field, maxField, minField) {
    if(!field && field.length != 0) {
        return "Quantity should not be Empty";
    }
    else if(field < minField) 
    {
        return "Quantity should be more than " + minField;
    }
    else if(field > maxField)
    {
        return "Quantity should be less than " + maxField;
    }
    return "";
}

export function validateAadhar(field) {
    field = field.toString();
    if(!field || field.length == 0) 
    {
        return "Aadhar Number should be empty";
    }
    else if(field.length <= 8) {
        return "Aadhar Number should be more than 8 number";
    }
    return "";
}

export function validateReports(fieldName, field, minField, maxField) {
    if(!field || field.length == 0) 
    {
        return fieldName +" should not be Empty";
    }
    else if(field.length < minField) {
        return fieldName +" should have atleast "+minField+" letters";
    }
    else if(field.length > maxField) {
        return fieldName +" should be less than "+maxField+" letters";
    }
    return "";
}



