import { makeStyles} from '@mui/styles';
import {useState} from "react";
import theme from '../theme';
import {Redirect} from 'react-router-dom';
import { Card, 
    CardContent, 
    TextField, 
    Typography, 
    Icon, CardActions, Button } from "@mui/material";
import auth from '../helper/auth-helper';
import authService from '../service/auth-service';


const useStyles = makeStyles({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  });


export default function Login(props){
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }
    const clickLogin = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        };
        authService.login(user)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error});
                  } else {
                    auth.authenticate(data, () => {
                      setValues({ ...values, error: '',redirectToReferrer: true});
                    })
                    console.log(data);
                  }
            })
            
    }
    const {from} = props.location.state || {
        from: {
          pathname: '/'
        }
    }
    const {redirectToReferrer} = values
    if (redirectToReferrer) {
        return (<Redirect to={from}/>)
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography>
                        Login
                    </Typography>
                    <TextField name="email" label="Email" type="email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/> <br/>
                    <TextField name="password" label="Password" type="password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/><br/>
                    {
                        values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                    </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="container" onClick={clickLogin} className={classes.submit}>Login</Button>
                </CardActions>
            </Card>
        </div>
    );
}