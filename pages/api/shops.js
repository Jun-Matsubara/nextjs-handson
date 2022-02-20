import getConfig from 'next/config';

const shops = async (req, res) => {
  const { HOTPEPPER_API_KEY } = getConfig().serverRuntimeConfig;

  const query = new URLSearchParams();
  query.set('key', HOTPEPPER_API_KEY);
  //APIキーのセット
  query.set('format', 'json');
  //様式はjsonで
  query.set('large_area', req.query.large_area || 'Z098');
  //地域は指定があれば指定されたやつ、なければ沖縄（Z098)で
  if (req.query.keyword) query.set('keyword', req.query.keyword);
  //もし、キーワードがあるならキーワードを追加して検索する

  const response = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`);
  const data = await response.json();

  return res.json(data.results.shop);
};

export default shops;
