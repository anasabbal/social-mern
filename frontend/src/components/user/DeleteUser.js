import { useState } from "react";
import auth from './../../helper/auth-helper';
import userService from "./../../service/user-service";
import {Redirect} from 'react-router-dom';
import PropsTypes from 'prop-types';
import { Button, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, Dialog,
    IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'




export default function DeleteUser (props){
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const clickOpen = () => {
        setOpen(true);
    }

    const deleteAccount = () => {
        const jwt = auth.isAuthenticated();
        userService.remove({
            userId: props.uuserId
        }, {t: jwt.token}).then((data) => {
            if(data && data.error){
                console.log(data.erro);
            }else{
                auth.clearJWT(() => console.log('deleted'));
                setRedirect(true);
            }
        })
    }
    const handleRequestClose =() => {
        setOpen(false);
    }
    if(redirect){
        return <Redirect to='/'/>
    }
    return (
        <span>
            <IconButton aria-label="Delete" onClick={clickOpen} color="secondary">
                <DeleteIcon/>
            </IconButton>

            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete your account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClock={deleteAccount} color="secondary" autoFocus="autoFocus">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

DeleteUser.propsTypes = {
    userId: PropsTypes.string.isRequired
}