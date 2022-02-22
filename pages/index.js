import React, { useEffect } from 'react'; //react.jsを使う際に書く文
import getConfig from 'next/config';
//emotion追加
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//追加
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
//grid
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
//アイコン
//import StarBorderIcon from '@mui/icons-material/StarBorder';
//import StarIcon from '@mui/icons-material/Star';
import DehazeIcon from '@mui/icons-material/Dehaze';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SetMealIcon from '@mui/icons-material/SetMeal';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

//追加
const styles = {
  box: css`
    margin: 0 auto;
    position: relative;
  `,
  box1: css`
    margin: 0 auto;
  `,
  h1: css`
    font-size: 35px;
    text-align: center;
  `,
  toppage: css`
    position: relative;
  `,
  title: css`
    font-size: 60px;
    color: #fff;
    font-weight: 700;
  `,
  list: css`
   height:100px:
   background:#555;
  `,
  span: css`
    position: absolute;
    bottom: 0;
    right: 50px;
    font-size: 50px;
  `,
  ham: css`
    color: #fff;
    position: absolute;
    right: 20px;
    top: 40px;
  `,
  fontsize: css`
    font-size: 40px;
    font-weight: 800;
  `,
};

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;
  //ホットペッパーAPIの取得

  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
  return await res.json();
};

const Shops = ({ firstViewShops }) => {
  const [keyword, setKeyword] = React.useState('');
  //setKeywordをkeywordという名前に保持している
  //更新したい場合はsetKeyword
  //値を呼び出したい場合はkeywordと使い分けができる
  const [shops, setShops] = React.useState([]);
  //setShopsをshopsという名前に保持している
  useEffect(() => {
    setShops(convertFavShops(firstViewShops));
    //iconの属性がセットされていなかった
  }, [firstViewShops]);
  //keyword変更後に検索内容を変更しないといけないと言っている(元のデータからの整形)
  const onSearchClick = async () => {
    const data = await fetchData(keyword);
    //onclickを押したとにその時のkeywordを取得

    setShops(convertFavShops(data));
    //setShopsに最新のkeywordをぶち込む
    setKeyword('');
    //setKeywordを空白に更新
  };
  const star = ['<StarBorderIcon />', 'StarIcon'];
  //お気に入り
  const convertFavShops = (shops) => {
    const favShops = JSON.parse(localStorage.getItem('favShops')) || [];
    return shops.map((shop) => {
      if (favShops.includes(shop.id)) {
        return {
          ...shop,
          icon: '★',
          //fav: favShops.includes(shop.id),
        };
      } else {
        return {
          ...shop,
          icon: '☆',
          //fav: favShops.includes(shop.id),
        };
      }
    });
  };

  const [fav, setFav] = React.useState([]);

  return (
    <Container component="main" maxWidth="100">
      <Box
        component="form"
        noValidate
        css={styles.toppage}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'orange',
          width: 1,
        }}
      >
        <h3 css={styles.title}>Okishoku</h3>
        <span css={styles.ham}>
          <DehazeIcon sx={{ fontSize: 80 }} />
        </span>
      </Box>

      <h1 css={styles.h1}>地域</h1>

      <Box
        component="form"
        noValidate
        maxWidth="md"
        css={styles.box1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //bgcolor: 'orange',
          width: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '那覇';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                那覇
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '浦添';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                浦添
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '北谷';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                北谷
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '沖縄市';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                沖縄市
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '西原';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                西原
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                css={styles.fontsize}
                sx={{ margin: 4, height: 80 }}
                onClick={() => {
                  keyword = '嘉手納';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                嘉手納
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <h1 css={styles.h1}>ジャンル</h1>

      <Box
        component="form"
        noValidate
        maxWidth="md"
        css={styles.box1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //bgcolor: 'orange',
          width: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <FoodBankIcon />
                すべて
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '居酒屋';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <LocalDrinkIcon />
                居酒屋
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = 'フレンチ';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <RestaurantIcon />
                フレンチ
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = 'ラーメン';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <RamenDiningIcon />
                ラーメン
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '和食';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <SetMealIcon />
                和食
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <h1 css={styles.h1}>こだわり</h1>

      <Box
        component="form"
        noValidate
        maxWidth="md"
        css={styles.box1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //bgcolor: 'orange',
          width: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '禁煙';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <SmokeFreeIcon />
                禁煙席有り
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '利用可';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <CreditCardIcon />
                カードOK!
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = 'お子様';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <ChildFriendlyIcon />
                子連れ歓迎
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '駐車場';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <LocalParkingIcon />
                駐車場有り
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '1500';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                <ThumbUpOffAltIcon />
                お手頃価格
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="form"
        noValidate
        maxWidth="md"
        css={styles.box}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 css={styles.h1}>検索結果</h1>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {shops.map((shop) => {
            const url = 'https://maps.google.com/maps?q=';
            return (
              <ListItem key={shop.id}>
                <ListItemAvatar>
                  <Avatar alt={shop.name} src={shop.logo_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <a href={shop.urls.pc}>{` ${shop.name}`}</a>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant="body1" component="span">
                        <a href={`${url}${shop.lat},${shop.lng}`}>{shop.address}</a>/ {shop.genre.name}
                        <br></br>
                        <br></br>
                        {`${shop.catch} ${shop.shop_detail_memo}`}
                        <br></br>
                        ￥:{shop.budget.average}/カード{shop.card}
                      </Typography>
                      <Typography variant="caption"></Typography>
                      <p>{shop.open}</p>
                      <br></br>
                      <input type="hidden" name="shop" value={shop.id}></input>
                      <span
                        css={styles.span}
                        //name={shop.id}
                        onClick={() => {
                          console.log(shop.id);
                          // 取得 なければ空配列
                          const favShops = JSON.parse(localStorage.getItem('favShops')) || [];
                          console.log(favShops);
                          const favInclude = favShops.includes(shop.id);
                          if (favInclude) {
                            // 存在したらお気に入りから外す
                            const index = favShops.indexOf(shop.id);
                            favShops.splice(index, 1);
                          } else {
                            // 存在しなければお気に入りにい追加する
                            favShops.push(shop.id);
                          }
                          // 保存
                          localStorage.setItem('favShops', JSON.stringify(favShops));
                          // 画面の更新
                          setShops(convertFavShops(shops));
                          console.log(shop.fav);
                        }}
                      >
                        {`${shop.icon}`}
                      </span>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (req) => {
  const data = await fetchData(req.query.keyword);
  //api/shops.jsのキーワード付きの条件を持ってくる、繰り返し文で
  return {
    props: {
      firstViewShops: data,
    },
  };
};

export default Shops;
//returnの値をShopsに持っていく
