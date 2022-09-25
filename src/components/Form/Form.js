import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch,useSelector  } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [ postData, setPostData ] = useState({name:'', surname:'', ID:'', phone:'', city:''});
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId,postData));
            clear(); 
        }else{   
            dispatch(createPost(postData)); 
            clear(); 
        }
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({ name: '', surname: '', ID: '', phone: '', city: '' });    
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6'>{currentId ? `Editing "${post.name}"` : 'Creating a Recipient'}</Typography>
            <TextField name='name' variant='outlined' label='Name' fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
            <TextField name='surname' variant='outlined' label='Surname' fullWidth value={postData.surname} onChange={(e) => setPostData({ ...postData, surname: e.target.value })}/>
            <TextField name='ID' variant='outlined' label='ID' fullWidth value={postData.ID} onChange={(e) => setPostData({ ...postData, ID: e.target.value })}/>
            <TextField name='phone' variant='outlined' label='Phone' fullWidth value={postData.phone} onChange={(e) => setPostData({ ...postData, phone: e.target.value })}/>
            <TextField name='city' variant='outlined' label='City' fullWidth value={postData.city} onChange={(e) => setPostData({ ...postData, city: e.target.value })}/>
            
            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
            <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;