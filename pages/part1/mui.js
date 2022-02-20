import React from 'react';
//追加
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//muiの使い方
//'@mui/material/使いたいデザインのタイトル
//https://mui.com/components/buttons/

//追加
const styles = {
  /*container: css`
    background-color: red;
  `,
  box: css`
    background-color: blue;
  `,*/
};

const Mui = () => {
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
        <TextField label="キーワードを入力してください" variant="outlined" margin="normal" fullWidth />
        <Button variant="contained" margin="normal" fullWidth>
          検索
        </Button>
      </Box>
    </Container>
  );
};

//TextFieldのvariantは枠線のデザイン変更(standard,outlined,filled)がある

//containerの設定
//https://mui.com/api/container/

//margin、noneにすると余白が消える

//Buttonのvariantはcontained,outlined,text,stringがある
//https://mui.com/api/button/

//sxでまとめて設定
//https://mui.com/system/the-sx-prop/
export default Mui;
