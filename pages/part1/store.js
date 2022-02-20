import React from 'react';
//追加
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//追加(なくても使える、他でも使えるようにしている)
import Typography from '@mui/material/Typography';

//追加
const styles = {
  /*container: css`
    background-color: red;
  `,
  box: css`
    background-color: blue;
  `,*/
};

const Store = () => {
  const [keyword, setKeyword] = React.useState('');
  return (
    <Container component="main" maxWidth="xs" css={styles.container}>
      <Box
        component="form"
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        css={styles.box}
      >
        <Typography>検索ワード: {keyword}</Typography>
        <TextField
          label="キーワードを入力してください"
          variant="standard"
          margin="normal"
          fullWidth
          value={keyword}
          onChange={(event) => {
            /*console.log('input change', event.target.value);*/
            setKeyword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          fullWidth
          /*value={keyword}*/
          onClick={(event) => {
            /*console.log(event.target.value);*/
            setKeyword('');
          }}
        >
          検索
        </Button>
      </Box>
    </Container>
  );
};
//{keyword}に値が格納されている
//buttonのコンソールにキーワードを格納すれば画面遷移の時にキーワードを保存できるかも
export default Store;
