import React,{useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import {addPatient} from '../../js/actions/doctorActions'
import { useHistory } from 'react-router-dom';

function AddPatient() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history =useHistory()
    const [FormData, setFormData] = useState({
        username:"",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:"",
        password: "",
    
      });


      const handleFormChange = (e) =>
      setFormData({ ...FormData, [e.target.name]: e.target.value });
  
      const handleConfim = (e) => {
        e.preventDefault();
        history.push('/patients')


        dispatch(
          addPatient(FormData));
       
      };
    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                              onChange={handleFormChange}

                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                              onChange={handleFormChange}

                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFormChange}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                              onChange={handleFormChange}

                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                              onChange={handleFormChange}

                variant="outlined"
                required
                fullWidth
                id="PhoneNumber"

                label="Phone Number"
                name="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                              onChange={handleFormChange}

                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
          </Grid>
          <Button
          onClick={(e) => {
            handleConfim(e);
           
          }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
          
        </form>
      </div>
    </Container>
    )
}

export default AddPatient


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));