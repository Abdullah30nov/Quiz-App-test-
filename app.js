  var firebaseConfig = {
    apiKey: "AIzaSyDbAb0Kd5j6EFE3a6BaYUDQdQ8iJt7FgOM",
    authDomain: "quizapp-database-18cfb.firebaseapp.com",
    databaseURL: "https://quizapp-database-18cfb-default-rtdb.firebaseio.com",
    projectId: "quizapp-database-18cfb",
    storageBucket: "quizapp-database-18cfb.appspot.com",
    messagingSenderId: "462720151867",
    appId: "1:462720151867:web:c98878fc56a3abd741071e"
  };
  var app = firebase.initializeApp(firebaseConfig);
  var db = firebase.database()
var questions = [
    {
    numb: 1,
    question: "Which of the following is correct about features of JavaScript?",
    answer: "All of the above.",
    options: [
      "JavaScript is a lightweight, interpreted programming language",
      "JavaScript is designed for creating network-centric applications",
      "JavaScript is complementary to and integrated with Java.",
      "All of the above."
    ]
  },
  {
    numb: 2,
    question: "Which of the following function of String object returns the characters in a string between two indexes into the string?",
    answer: "substring()",
    options: [
      "slice()",
      "split()",
      "substr()",
      "substring()"
    ]
  },
  {
    numb: 3,
    question: "Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",
    answer: "anchor()",
    options: [
      "anchor()",
      "link()",
      "blink()",
      "big()"
    ]
  },
  {
    numb: 4,
    question: "Which of the following function of Array object represents the source code of an object?",
    answer: "toSource()",
    options: [
      "toSource()",
      "splice()",
      "toString()",
      "unshift()"
    ]
  },
  {
    numb: 5,
    question: "Which built-in method returns the calling string value converted to lower case?",
    answer: "toLowerCase()",
    options: [
      "toLowerCase()",
      "toLower()",
      "changeCase(case)",
      "None of the above."
    ]
  },
  {
    numb: 6,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
  {
    numb: 7,
    question: "What does CSS stand for?",
    answer: "Cascading style sheet",
    options: [
      "Certificate style sheet",
      "Cascading style sheet",
      "Cascading sheet style",
      "Coloring style sheet"
    ]
  },
  {
    numb: 8,
    question: "What does JS stand for?",
    answer: "Javascript",
    options: [
      "Java",
      "Jasonscript",
      "Javascript",
      "Javasheet"
    ]
  },
  {
    numb: 9,
    question: "How to show alert?",
    answer: "alert('Hello')",
    options: [
      "alert('Hello')",
      "alert Box('Hello')",
      "Alert('Hello')",
      "alert['Hello']"
    ]
  },
  {
    numb: 10,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },

];

var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var time_line = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");
var canvas = document.querySelector("#my-canvas");
var audio = new Audio('applause.mp3');

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

var timeValue =  15;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var counterLine;
var widthValue = 0;

function showQuetions(index){
    var que_text = document.querySelector(".que_text");
    var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    var option = option_list.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    var userAns = answer.textContent;
    var correcAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    var id = Date.now().toString(25)
    var obj = {
        Question:questions[que_count].question,
        Options:questions[que_count].options,
        CorrectAnswer:questions[que_count].answer ,
        UserAnswer: userAns,
    }
    firebase.database().ref(`Quiz Data/ ${id}`).set(obj)
    
    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function queCounter(index){
    
    var totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){ 
            var addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";
            var allOptions = option_list.children.length;
            var correcAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        time_line.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

var next_btn = document.querySelector("footer .next_btn");
var bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine); 
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    if (userScore >= 3){
       
        var scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        canvas.classList.add("show-canvas");   
        audio.play();
        audio.loop = true;
    }
    else if(userScore > 1){
        var scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        var scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    firebase.database().ref("Quiz Data").remove()
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult"); 
    canvas.classList.remove("show-canvas");
    audio.pause();
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine);
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

quit_quiz.onclick = ()=>{
    firebase.database().ref("Quiz Data").remove()
    window.location.reload(); 
}