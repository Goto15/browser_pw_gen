//All possible password characters
const CHAR_SET = {
    Numbers: "0123456789",
    Lower: "abcdefghijklmnopqrstuvwxyz",
    Upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Special: "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
}

//Returns a string from the selected character set. 
function generatePassword(length, characters){
    if(length > 256){
        return "Password length is too long."
    }

    var array = ""
    
    for(var i = 0; i < length; i++)
        array += characters[generateRandomInt(0, characters.length-1)]

    return array
}

//Cryptographically secure random number generator for grabbing individual chars
function generateRandomInt(min, max){
    var range = max - min + 1
    var max_range = CHAR_SET.Numbers.length + CHAR_SET.Lower.length + CHAR_SET.Upper.length + CHAR_SET.Special.length
    var array = new Uint8Array(1)

    window.crypto.getRandomValues(array)

    if(array[0] >= Math.floor(max_range/range) * range)
        return generateRandomInt(min, max)
    return min + (array[0] % range)
}

$("#results_button").click("click", function(){
    //First clear the results div
    $("#password_results").text("")

    var selected_chars = ""
    var selected_length = parseInt($("#length_box").val())
    var selected_type = parseInt($("input[name='password_type']:checked").val())

    //Password Type Logic

    if(!selected_type){
        $("#password_results").text("Not implemented yet.")
        return
    } 

    //Length logic
    if(!(1 <= selected_length && selected_length <=256)){
        $("#password_results").text("Please pick a number between 1-256.")
        return
    }

    //Character logic
    if($("#lower_box").is(":checked")){
        selected_chars += CHAR_SET.Lower
    }
    if($("#upper_box").is(":checked")){
        selected_chars += CHAR_SET.Upper
    }
    if($("#num_box").is(":checked")){
        selected_chars += CHAR_SET.Numbers
    }
    if($("#spec_box").is(":checked")){
        selected_chars += CHAR_SET.Special
    }
    if(!selected_chars){
        //If nothing is selected behave as if everything is.
        selected_chars += CHAR_SET.Lower + CHAR_SET.Upper + CHAR_SET.Numbers + CHAR_SET.Special
    }

    $("#password_results").text(generatePassword(selected_length, selected_chars))
})
