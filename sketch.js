const subject = document.getElementById('subject');
const term = document.getElementById('term');
const timer = document.getElementById('timer');
const form = document.forms.typing;
const textList = [
  ['swift', 'iPhone開発言語'],
  ['kotlin', 'Android開発言語'],
  ['unity', 'game開発ソフト'],
  ['c#', 'game開発言語'],
  ['html', 'web-pageマークアップ言語'],
  ['css', 'web-pageスタイルシート'],
  ['JavaScript', 'webpage操作言語'],
  ['ruby', 'web-service開発言語'],
  ['let', '定数の宣言'],
  ['var', '変数の宣言'],
  ['int', '整数'],
  ['string', '文字列'],
  ['for', '繰り返し処理'],
  ['if else', '条件分岐'],
  ['array', '配列'],
  ['print', '出力'],
  ['log', 'ログ'],
  ['true', '真'],
  ['false', '偽'],
  ['class', 'クラス'],
  ['struct', '構造体'],
  ['return', '戻り']
];
let TIME_LIMIT = 8;
let correctList = [];
let countdown;
let gameStatus;
const WAITING = 'waiting'
const TYPING = 'typing'
const FINISHED = 'finished'


form.btn.addEventListener('click', function(e) {
  if(gameStatus!==TYPING) return;
 
  if(form.input.value === term.textContent) {
    correctList.push(term.textContent);
    setGame();
  } else {
    subject.textContent = '間違いです！';
    setTimeout(function(){ setGame() }, 1000)
  }
});
 
document.body.onkeyup = function(e){
  if(gameStatus===WAITING && e.keyCode == 32){
    // ゲーム開始待機中にスペースキー押下
    setupGame();
    setGame();
  }
  
  if(gameStatus===FINISHED && e.keyCode == 27){
    // ゲーム終了後にESCキー押下
    init();
  }
}

init();
 
function init() {
  gameStatus = WAITING;
  correctList = [];
  subject.textContent = 'space押下でgame start!';
}

function setGame() {
  const randomIndex = Math.floor(Math.random() * textList.length);

  subject.textContent = textList[randomIndex][1];
  term.textContent = textList[randomIndex][0];
  form.input.value = '';
  form.input.focus();
}

function setupGame() {
  gameStatus = TYPING;
  time = TIME_LIMIT;
  countdown = setInterval(function() {
    timer.textContent = '制限時間：' + --time + '秒';
    if(time <= 0) finish();
  }, 1000);
  timer.textContent = '制限時間：' + TIME_LIMIT + '秒';
}
 
function finish() {
  gameStatus = FINISHED;
  clearInterval(countdown);
  var sum = 0;
  for (const collectTerm of correctList) {
    sum += collectTerm.length;
  }
  subject.textContent = '正解数：' + sum + '文字、' + correctList.length + '用語！';
  term.textContent = '';
}