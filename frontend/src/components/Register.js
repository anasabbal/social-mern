import { makeStyles} from '@mui/styles';
import {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    TextField,
    Typography,Icon
} from '@mui/material';
import userService from "../service/user-service";
import theme from '../theme';
import {Link} from 'react-router-dom';



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
export default function Register (){
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    }
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };
        userService.create(user).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, error: '', open: true});
            }
        })
    };

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title}>
              Register
            </Typography>
            <TextField name="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
            <TextField name="email" label="Email" type="email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/> <br/>
            <TextField name="password" label="Password" type="password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/><br/>
            {
              values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
              </Typography>)
            }
          </CardContent>
          <CardActions>
            <Button color="primary" variant="container" onClick={clickSubmit} className={classes.submit}>Submit</Button>
          </CardActions>
          <Dialog open={values.open} disableBackdropClick={true}>
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                New Account successfully created .
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Link to="/login">
                <Button color="primary" autoFocus="autoFocus" variant="contained">
                  Login
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </Card>
      </div>
    )
}
