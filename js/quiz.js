const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const result_box = document.querySelector(".result_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

//Quiz start button clicked

start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info_box
}

//exit_btn clicked

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");// hide info_box
}

//continue_btn clicked

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // hide info_box
  quiz_box.classList.add("activeQuiz");
  showQuestions(0); // show quiz_box
  queCounter(1);
  startTimer(30);
  startTimerLine(0);
}

let que_count = 0
let que_numb = 1
let counter;
let timevalue = 30;
let counterLine;
let widthvalue = 0;
let useScore = 0;

const next_btn = quiz_box.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit")

restart_quiz.onclick = () => {
  window.location.reload()
}

quit_quiz.onclick = () => {
  window.open('../home.html');
}

//next_btn clicked

next_btn.onclick = ()=>{
  if(que_count < questions.length - 1){
      que_count++;
      que_numb++;
      showQuestions(que_count);
      queCounter(que_numb);
      clearInterval(counter);
      startTimer(timevalue);
      clearInterval(counterLine);
      startTimerLine(widthvalue);
      next_btn.style.display = "none";
      timeOff.textContent = "Time Left";
  } else {
     clearInterval(counter);
      clearInterval(counterLine);
    showResultBox()
  }
}

//getting questions

function showQuestions(index){
  const que_text = document.querySelector(".que_text");

  let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
  let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                  + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                  + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                  + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;

  if(userAns == correctAns){
    useScore += 1;
    answer.classList.add("correct");
    console.log("Answer is correct!")
    answer.insertAdjacentHTML("beforeend", tickIcon)
  } else {
    answer.classList.add("incorrect")
    console.log('Answer is wrong')
    answer.insertAdjacentHTML("beforeend", crossIcon)
  for (let i = 0; i < allOptions; i++) {
    if(option_list.children[i].textContent == correctAns){
      option_list.children[i].setAttribute("class", "option correct");
      option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
    }
  }

  }

//user select once then other options disabled it;

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    next_btn.style.display = "block";

}

function showResultBox(){
  info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult");//show result box
    const scoreText = result_box.querySelector(".score_text");
    if(useScore > 3){
      let score_Tag = '<span>and congrats! you got <p>'+ useScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = score_Tag
    }
       else if(useScore > 1){
      let score_Tag = '<span>and nice, you got <p>'+ useScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = score_Tag
    }
      else{
      let score_Tag = '<span>and sorry, you got only <p>'+ useScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = score_Tag
    }
}


function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time--;
    if(time < 9){
      let addzero = timeCount.textContent;
      timeCount.textContent = "0" + addzero

    }
    if(time < 0){
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
      for (let i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent == correctAns){
      option_list.children[i].setAttribute("class", "option correct");
      option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
    }
  }
      for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }

    next_btn.style.display = "block";
    }
  }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 59);
    function timer(){
        time += 1; //upgrading time value with 1
        timeLine.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
   let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

