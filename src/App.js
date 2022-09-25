import React, { useState, useEffect } from 'react';
import { Container,Toolbar,Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch} from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import recipients from './images/recipients.jpg';
import useStyles from './styles';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  },[currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Toolbar className={classes.toolBar} position = "static" color="inherit">
        <Typography className={classes.heading} variant='h2' align="center">Shumba Recipients</Typography>
        <img className={classes.image} src = {recipients} alt ="recipients" height="60"/>
      </Toolbar>
      <Grow in>
        <Container>
          <Grid container justifyContent= "space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts  setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
export default App;