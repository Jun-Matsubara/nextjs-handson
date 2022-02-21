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
//selectボタン
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material';

//追加
const styles = {
  box: css`
    margin: 0 auto;
  `,
  box1: css`
    margin: 0 auto;
    height: 300px;
  `,
  h1: css`
    font-size: 35px;
    text-align: center;
  `,
  toppage: css`
    font-size: 60px;
    color: #fff;
    font-weight: 700;
  `,
  list: css`
   height:100px:
   background:#555;
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
    setShops(firstViewShops);
  }, [firstViewShops]);
  //keyword変更後に検索内容を変更しないといけないと言っている(元のデータからの整形)
  const onSearchClick = async () => {
    const data = await fetchData(keyword);
    //onclickを押したとにその時のkeywordを取得

    setShops(data);
    //setShopsに最新のkeywordをぶち込む
    setKeyword('');
    //setKeywordを空白に更新
  };

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
        Okishoku
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
          bgcolor: 'orange',
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
                  keyword = '那覇';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                那覇
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '浦添';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                浦添
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '北谷';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                北谷
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '沖縄市';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                沖縄市
              </Button>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: 4 }}
                onClick={() => {
                  keyword = '西原';
                  console.log(keyword);
                  onSearchClick();
                }}
              >
                西原
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
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {shops.map((shop) => {
            return (
              <ListItem key={shop.id}>
                <ListItemButton
                  onClick={() => {
                    // TODO: goto shop detail
                  }}
                >
                  <a a href={shop.urls.pc}>
                    <ListItemAvatar>
                      <Avatar alt={shop.name} src={shop.logo_image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<>{shop.name}</>}
                      secondary={
                        <>
                          <Typography variant="body1" component="span">
                            {shop.address} / {shop.genre.name}
                            <br></br>
                            {`${shop.catch} ${shop.shop_detail_memo}`}
                            <br></br>
                            ￥:{shop.budget.average}/カード{shop.card}
                          </Typography>

                          <Typography variant="caption"></Typography>
                          <p>{shop.open}</p>
                        </>
                      }
                    />
                  </a>
                </ListItemButton>
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
