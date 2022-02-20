import React from 'react'; //必ず書く文章(htmlを使うなら)

const HelloWorld = () => {
  //定数HelloWorldの宣言
  return (
    //この中身が実行するもの
    <div>
      <div>Welcome to Next.js!!</div>
    </div>
  );
};

export default HelloWorld;
//他のファイルでimportする際のデフォルトの値
//この宣言がないと表示されない
//値は定数と同じでなければならない
