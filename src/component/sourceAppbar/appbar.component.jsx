import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Appbar = ({label}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography
                    style={{ fontFamily: "Lilita One", color: "white" }}
                    variant="caption"
                >
                    {label}
            </Typography>
            </Paper>
        </Grid>
    )
}

export default Appbar;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "left",
        background: "#1a237e",
        borderRadius:'0',
      },
}));