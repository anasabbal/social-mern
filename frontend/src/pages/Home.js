import {makeStyles} from "@mui/styles";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import theme from "../theme";


const useStyles = makeStyles({
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    media: {
      minHeight: 400
    },
    credit: {
      padding: 10,
      textAlign: 'right',
      backgroundColor: '#ededed',
      borderBottom: '1px solid #d0d0d0',
      '& a': {
          color: '#3f4771'

      }
    }
});

export default function Home(){
    const classes = useStyles()
      return (
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia className={classes.media}  title="Unicorn Bicycle"/>
            <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by chkhssiya on la maison</Typography>
            <CardContent>
              <Typography variant="body1" component="p">
                Welcome to the SOCIAL MERN.
              </Typography>
            </CardContent>
          </Card>
      )
}
