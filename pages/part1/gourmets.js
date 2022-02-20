import React, { useEffect } from 'react'; //react.jsを使う際に書く文
import getConfig from 'next/config';
//emotion追加
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
//追加
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
  toppage: css`
    font-size: 60px;
    color: #fff;
    font-weight: 700;
  `,
};

const fetchData = async (keyword) => {
  const { API_HOST } = getConfig().publicRuntimeConfig;
  //ホットペッパーAPIの取得

  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
  console.log('手順1');
  return await res.json();
};

const Shops = ({ firstViewShops }) => {
  const [keyword, setKeyword] = React.useState('');
  //setKeywordをkeywordという名前に保持している
  //更新したい場合はsetKeyword
  //値を呼び出したい場合はkeywordと使い分けができる
  const [shops, setShops] = React.useState([]);
  //setShopsをshopsという名前に保持している
  console.log('手順3');
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
    console.log('手順4');
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

      <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem>Ten</MenuItem>
        <MenuItem>Twenty</MenuItem>
        <MenuItem>Thirty</MenuItem>
      </Select>

      <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem>Ten</MenuItem>
        <MenuItem>Twenty</MenuItem>
        <MenuItem>Thirty</MenuItem>
      </Select>

      <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem>Ten</MenuItem>
        <MenuItem>Twenty</MenuItem>
        <MenuItem>Thirty</MenuItem>
      </Select>

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
        <TextField
          label="キーワードを入力してください"
          variant="standard"
          margin="normal"
          fullWidth
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          fullWidth
          onClick={() => {
            onSearchClick();
          }}
        >
          検索
        </Button>
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
        <List>
          {shops.map((shop) => {
            return (
              <ListItem key={shop.id}>
                <ListItemButton
                  onClick={() => {
                    // TODO: goto shop detail
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={shop.name} src={shop.logo_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${shop.genre.name} ${shop.name}`}
                    secondary={
                      <>
                        <Typography variant="body1" component="span">
                          {`${shop.catch} ${shop.shop_detail_memo}`}
                        </Typography>
                        <Typography variant="caption">{shop.address}</Typography>
                      </>
                    }
                  />
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
