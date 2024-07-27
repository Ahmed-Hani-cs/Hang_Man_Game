//letters
const letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
//select letters div
let lettersContainer = document.querySelector(".letters");

//make letters boxs in its container
lettersArray.forEach((letter)=>{
    let span=document.createElement("span");
    let textSpan=document.createTextNode(letter);
    span.append(textSpan);
    span.className="letter_box";
    lettersContainer.appendChild(span);
})
// set thr click status******
let status=false;
//objects od word and category
const word={
    programing_language:["php",'javascript','python',"java"],
    football_players:['messi','ronaldo','ramos','zidan','inesta','salah'],
    football_club_in_england:['liverpool','Chelsea','wolves','everton','tot','salah'],
    arab_contries:['sudan','syria','palestine','eraq','qatar','Egypt']
}
//Get random property
let allKeys=Object.keys(word);
let randomIndex_category=Math.floor(Math.random()*allKeys.length);
let randomCategory=allKeys[randomIndex_category];
//Get random word
let all_words=word[randomCategory];
let randomIndex_word=Math.floor(Math.random()*all_words.length);
let random_word=all_words[randomIndex_word];

//set category info in dom
let categoryName=document.querySelector(".category span");
categoryName.innerHTML=randomCategory;

//select letters Guess Element
let lettersGuess=document.querySelector(".letters-guess");
//Get letters from chosen word
let word_letters_array=Array.from(random_word);
console.log(random_word);
console.log(word_letters_array)
word_letters_array.forEach((letter)=>{
    let span=document.createElement("span");
    if(letter==" "){
        span.classList.add("its_space");
    }
    //append span to div
    lettersGuess.appendChild(span);
})
//select Guess span
let guess_span=document.querySelectorAll(".letters-guess span");

//set wrong attempts
the_wrong_attempts=0;
//select draw element
let draw=document.querySelector(".hangman-draw");
//Handel clicking on letters
document.addEventListener("click",(e)=>{
// set thr click status******
    let status=false;
    // ****
    if(e.target.className==="letter_box"){
            e.target.classList.add("is_clicked");
        //clicked letter    
            clicked_letter=e.target.innerHTML.toLowerCase();
        //check the clicked letter in the chosn word or not;
            let my_word=Array.from(random_word.toLowerCase());
            if(my_word.includes(clicked_letter)){
                // ************
                status=true;
                // ************
                my_word.forEach((letter,i)=>{
                    if(letter==clicked_letter){
                        guess_span[i].innerHTML=clicked_letter;
                    }
                })
            }
            console.log(status)
            if(status!==true){
                the_wrong_attempts++;
                draw.classList.add(`wrong-${the_wrong_attempts}`);
                // fail audio*************
                document.getElementById("fail").play();
                if(the_wrong_attempts===8){
                    endGame_failer();
                    document.getElementById("end-fail").play();
                    lettersContainer.style.pointerEvents="none";
                 } 
            }else{
                // Success audio*************
                document.getElementById("success").play();
                 // check if all letters are guessed
                var guess_span_array = [...guess_span];
                if(guess_span_array.every(span=> span.innerText.trim()!="")){
                    console.log("end gaaaaaaaaaaaaaem")
                    endGame_success( the_wrong_attempts );
                    document.getElementById("end-success").play();
                    lettersContainer.style.pointerEvents="none";
                }
            }
        }
    });
    
    function endGame_failer(){
        let div=document.createElement("div");
        let divText=document.createTextNode(`Game Over , the word is ${random_word}`);
    div.appendChild(divText);
    div.className="popup";
    document.body.appendChild(div);
    setTimeout(function(){
        location.reload()
    },4000)
}
function endGame_success( the_wrong_attempts ){
    let div=document.createElement("div");
    let divText=document.createTextNode(`you win , the word is ${random_word} , the wrong attempts is ${the_wrong_attempts}`);
    div.appendChild(divText);
    div.className="popup";
    document.body.appendChild(div);
    setTimeout(function(){
        location.reload()
    },4000)
    
}

