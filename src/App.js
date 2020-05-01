import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Appbar from "./component/sourceAppbar/appbar.component";
import Table from "./component/token-table/token-table.component";
import Vahshiimg from './assets/vahshi.png';
function App() {
  const classes = useStyles();
  const [input, setInput] = React.useState(initialInput);
  const handleInputChange = (e) => setInput(e.target.value);
  
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Grid container > 
          <Grid item xs={6}>
          <Typography
              style={{ fontFamily: "Lilita One", color: "white" }}
              variant="h4"
            >
              VahshiBafghi 1.0.0.1
            </Typography>
            </Grid>
            <Grid item xs={6} >
            <Grid item>
            <img style={{height:'60px',float:'right'}} src={Vahshiimg} alt='Vahshi'/>
            </Grid>
            
            
            
            </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container spacing="4" justify="center">
          <Grid item xs={6}>
            <Appbar label={"Source File"} />
            <TextareaAutosize
              style={{ width: "100%",minWidth:'100%',fontFamily:'Arimo' }}
              aria-label="minimum height"
              rowsMin={10}
              placeholder="Type here..."
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <Appbar label={"Output"} />
            <TextareaAutosize
              style={{ width: "100%" }}
              aria-label="minimum height"
              rowsMin={10}
              placeholder="Type here..."
            /> */}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
          <Grid item xs={12} >
          <Appbar label={"Token Table"} />
          <Table data={getTokens(input)} />
          </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

const getTokens = (input) => {
  const regex = /(((?:@[a-zA-Z]\w*)\b)|("[^"]*")|((?:\b(?:\d+(?:\.\d+)?)\b))|([\-+\/*%=])|(#)|(\()|(\))|(<<)|(>>)|(as)|(ifn)|(loop)|(on)|(by)|(say)|(get))/gi;
  let tokens = [];
  for (let match = regex.exec(input); match; match = regex.exec(input)) 
    tokens = [...tokens,{ value: match[0], row: match.index, group: groupName(match) },];
  return tokens;

};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    background: "#607d8b",
  },
}));

const groupName = (m) => {
  let group;
  m.some((e, i) => {
    if (e && i > 1) {
      group = i;
    }
    return group;
  });

  return group;
};
const initialInput = `@age = 20#
as(@age >: 20)<<
say "You are too old."#
>>
ifn(@age < 20 )<<
	say "Young dude"#
>>

`;