const subject = document.getElementById('subject');
const timer =
      document.getElementById('timer');
const form = document.forms.typing;
const textList = [
  'Hello World',
  'swift',
  'kotlin',
  'unity',
  'c#',
  'html',
  'css',
  'JavaScript',
  'ruby',
  'let',
  'var',
  'int',
  'string',
  'for',
  'if',
  'if else',
  'array',
  'list',
  'print',
  'log',
  'public',
  'private',
  'true',
  'false',
  'class',
  'struct',
  'return'
];
 
let TIME = 5;
let state = true;
let correctList = [];
 
const countdown = setInterval(function() {
  timer.textContent = '制限時間：' + --TIME + '秒';
  if(TIME <= 0) finish();
}, 1000);
 
form.btn.addEventListener('click', function(e) {
  if(!state) return;
 
  if(form.input.value === subject.textContent) {
    correctList.push(subject.textContent);
    init();
  } else {
    subject.textContent = '間違いです！';
    setTimeout(function(){ init() },1000)
  }
});
 
init();
 
function init() {
  const randomIndex = Math.floor(Math.random() * textList.length);
 
  subject.textContent = textList[randomIndex];
  form.input.value = '';
  form.input.focus();
}
 
function finish() {
  clearInterval(countdown);
  var sum = 0;
  for (const collectTerm of correctList) {
    sum += collectTerm.length;
  }
  subject.textContent = '正解数：' + sum + '文字、' + correctList.length + '語！';
  state = false;
}