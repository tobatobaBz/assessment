'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) { // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空の時は処理を終了する
    return;
  }

userNameInput.onkeydown = (event) => {
　if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}のいいところはありません。残念！来世に期待！', 
  '{userName}さんのいいところはまなざしです。{userName}に見つめられると怖くて震え上がるでしょう。',
  '{userName}さんのいいところは厳しさです。{userName}のあまりの厳しさに鬼も泣いて逃げ出します。',
  '{userName}さんのいいところは博識さです。どうでもいい知識をひけらかし、友達が減ることに定評があるでしょう。',
  '{userName}さんのいいところはユニークさです。特に{userName}さんの突飛な発想と世界観にはいつもドン引きです。',
  '{userName}さんのいいところは見た目です。あまりの醜さに人が離れていくでしょう。',
  '{userName}さんのいいところは決断力です。{userName}さんの判断はいつも間違っているので周りの人を困らせ、不利益を与えます。',
  '{userName}さんのいいところは自制心です。{userName}さんが座右の銘とする「超えちゃいけないラインはスタートライン」という言葉には頭が下がります。', 
  '{userName}さんのいいところは全てです。なわけねーだろタコ', 
  '{userName}さんのいいところは好奇心です。いつも新しいことばかりしていてミーハーですよね。', 
  '{userName}さんのいいところは情熱です。{userName}さんの馬鹿の一つ覚えみたいな情熱が非常に腹立たしいです。', 
  '{userName}さんのいいところは声です。{userName}さんの特徴的な声は、まるで動物園の猿山にいるような感覚にさせてくれます。',
  '{userName}のいいところは優しさです。{userName}さんの優しい雰囲気や立ち振る舞いはまるで詐欺師のようです。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharCode % answers.length;
  let result = answers[index];

result = result.replace(/{userName}/g, userName);
 return result;
}
