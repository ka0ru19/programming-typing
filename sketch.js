const term = document.getElementById('term');
const description = document.getElementById('description');
const timer = document.getElementById('timer');
const typing = document.getElementById('typing');
const form = document.forms.typing;
const textList = [
  ['swift', 'iPhone開発言語'],
  ['kotlin', 'Android開発言語'],
  ['unity', 'game開発ソフト'],
  ['c#', 'unity game開発言語'],
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
let TIME_LIMIT = 20;
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
    description.textContent = '◎ 正解!';
  } else {
    description.textContent = '× 間違いです！';
  }
  setTermBlurStyle(0);
  setTimeout(function(){ setGame() }, 1000);
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
let blursize;

init();

function init() {
  gameStatus = WAITING;
  correctList = [];
  term.textContent = 'ココに表示される用語をtype!';
  description.textContent = 'space押下でgame start! ※ぼかしはクリックで消えます';
  // typingの非活性化
  typing.style.display ="none";
  blursize = 8;
  setTermBlurStyle(blursize--);
}

term.onclick = function() {
  // ここに#buttonをクリックしたら発生させる処理を記述する
   setTermBlurStyle(blursize--);
};

function setTermBlurStyle(size) {
  term.style.filter = "blur(" + String(size) + "px)";
}

function setGame() {
  const randomIndex = Math.floor(Math.random() * textList.length);
  blursize = 8;
  setTermBlurStyle(blursize--);

  term.textContent = textList[randomIndex][0];
  description.textContent = textList[randomIndex][1];
  form.input.value = '';
  form.input.focus();
}

function setupGame() {
  gameStatus = TYPING;
  time = TIME_LIMIT;
  // typingの活性化
  typing.style.display ="block";
  countdown = setInterval(function() {
    timer.textContent = '制限時間：' + --time + '秒';
    if(time <= 0) finish();
  }, 1000);
  timer.textContent = '制限時間：' + TIME_LIMIT + '秒';
}

function finish() {
  gameStatus = FINISHED;
  clearInterval(countdown);
  setTermBlurStyle(0);
  var sum = 0;
  for (const collectTerm of correctList) {
    sum += collectTerm.length;
  }
  term.textContent = '正解数：' + sum + '文字、' + correctList.length + '用語！';
  description.textContent = 'Escキーでスタートに戻る';
  // typingの非活性化
  typing.style.display ="none";
}
