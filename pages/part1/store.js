import React from 'react';
//追加
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <TextField
          label="キーワードを入力してください"
          variant="standard"
          margin="normal"
          fullWidth
          onChange={(event) => {
            console.log('input change', event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          fullWidth
          onClick={() => {
            console.log('button click');
          }}
        >
          検索
        </Button>
      </Box>
    </Container>
  );
};

export default Mui;
