import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import { getTokens,  } from "./functions/lexical";
import Appbar from "./component/sourceAppbar/appbar.component";
import Table from "./component/token-table/token-table.component";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { checkSyntax } from "./functions/SyntaxAnalyzer";
import {parseTable} from './functions/parseTable';
function App() {

  const classes = useStyles();
  const [input, setInput] = React.useState(initialInput);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(``);
  const handleInputChange = (e) => setInput(e.target.value);
  const handleClose = () => setOpen(false);
  
  const Alert = (props) => (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
  return (
    <>
      <Grid container className={classes.root} alignContent="flex-start">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={2} sm={1}>
                <Grid container justify="center">
                  <img
                    className={classes.avatar}
                    src="https://i.ganjoor.net/vahshi.gif"
                    alt="Vahshi"
                  />
                </Grid>
              </Grid>
              <Grid item xs={8} sm={4}>
                <Typography className={classes.headerText} variant="h5">
                  VahshiBafghi 1.0.2
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "16px" }}>
          <Grid container justify="space-between" alignItems="stretch">
            <Grid item xs={12} sm={6} >
              <Container >
                <CssBaseline />
                <Appbar label={"Source File"} />
                <div class="textarea-wrapper">
                  <textarea
                    rows="16"
                    cols="30"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type here..."
                  />
                </div>
                <Button
                style={{marginTop:'6px'}}
                variant="contained"
                onClick={()=>{
                  let ret = getTokens(input);

                  
                }}
              >
                Check
              </Button>
              </Container>
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Container>
                <CssBaseline />
                <Table data={getTokens(input)} />
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        key={`bottom ,left`}
        open={open}
        onClose={handleClose}
        message={error}
      >
        <Alert
          onClose={handleClose}
          severity={error.length === 0 ? "success" : `error`}
        >
          {error.length === 0 ? "There is no invalid token" : error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fafafa",
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "#ffaa00",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23ffb100' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23ffb800' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23ffbf00' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23ffc500' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffcc00' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23ffd624' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23ffe038' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23ffeb49' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23fff558' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ffff66' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    background: "#00c853",
    borderRadius: "0",
  },
  headerText: {
    fontFamily: "Lilita One",
    color: "white",
    paddingTop: "9px",
  },
  avatar: {
    height: "50px",
    pointerEvents: "none",
    userSelect: "none",
  },
}));

const initialInput = `@age = 20#
as(@age <: 20)<<
say " too young."#
>>
ifn(@age >: 60 )<<
	say "too old"#
>>
finally<<
say "Not Too Young, Not Too Old"#
>>
{This is a comment}

until(@temp >: 0)<<
	say @temp#
	@temp = @temp- 1#
>>
`;




const doIpStuff = ()=>{
  let ipRe = /\d+/g;
  let ip = '192.168.1.1';
  let prefix = 10;
  getPrefixAndSubnetMask(prefix)
  let SubnetMask = "255.255.255.0";
  let BinaryIp = [];
  let BinarySubnetMask = [];
  for(let match = ipRe.exec(ip); match; match = ipRe.exec(ip) ){
    BinaryIp.push("00000000".substr((match[0] >>>0).toString(2).length) + (match[0] >>>0).toString(2))
  }
  for(let match = ipRe.exec(SubnetMask); match; match = ipRe.exec(SubnetMask) ){
    BinaryIp.push("00000000".substr((match[0] >>>0).toString(2).length) + (match[0] >>>0).toString(2))
  }
   
  console.log(BinaryIp)



};











const getPrefixAndSubnetMask = (prefix, subnetMask)=>{
  if(prefix !== ""){
    subnetMask = "";
    let count = 0;
    while(prefix > 0){
      subnetMask = subnetMask + '1';
      count++;
      prefix--;
      if(count === 8 && prefix>0){
        subnetMask = subnetMask + '.';
        count = 0;
      }
      
    }
    while(subnetMask.length < 35){
      subnetMask = subnetMask + '0';
      count++;
      if(count===8 && subnetMask.length < 34){
        count = 0;
        subnetMask = subnetMask + '.';
      }
    }
    console.log(subnetMask);

  }
  else {
    
  }
}




let getType = ['', '',
    'VARIABLE', 'STRING',
    'FLOAT', 'INTEGER','NOT',
    'EQUAL', 'SIGN', 'SIGN', 'MATH_OPERATOR', 'MATH_OPERATOR', 'MATH_OPERATOR', 'POWER',
    'DELIMITER',
    'LPAREN', 'RPAREN',
    'OPEN_STATEMENT',
    'CLOSE_STATEMENT',
    'AS', 'IFN',
    'LOOP', 'ON',
    'BY', 'SAY','GET','FINALLY',
    'UNTIL', 'COMP1','COMP2','AND','OR','COMMENT'];



    const isTerminal = (token) =>{
      return getType2[token];
    }






    
const getType2 = {
'VARIABLE':true, 'STRING':true,
'FLOAT':true, 'INTEGER':true,'NOT':true,
'EQUAL':true, 'SIGN':true, 'SIGN':true, 'MATH_OPERATOR':true, 'MATH_OPERATOR':true, 'MATH_OPERATOR':true, 'POWER':true,
'DELIMITER':true,
'LPAREN':true, 'RPAREN':true,
'OPEN_STATEMENT':true,
'CLOSE_STATEMENT':true,
'AS':true, 'IFN':true,
'LOOP':true, 'ON':true,
'BY':true, 'SAY':true,'GET':true,'FINALLY':true,
'UNTIL':true, 'COMP1':true,'COMP2':true,'AND':true,'OR':true,'COMMENT':true};
