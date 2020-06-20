import {parseTable} from './parseTable'

export const checkSyntax = (tokens)=>{
  let terStack = ['$','S'];
  while(tokens?.length){
    console.log(terStack);
    let currentRule = terStack[terStack.length-1];
    let nextToken = getType[tokens[0].group];
    if(isTerminal(currentRule)){
      if(currentRule===nextToken){
        console.log(terStack.pop() + ' is Out');
        console.log(tokens.shift() + ' is Out');
      }else{
        console.log(`Error in line ${tokens[0].row} near token ${nextToken} WE EXPECTED ${currentRule}`);
        break;
      } 
    }else{
      let next = parseTable[currentRule][nextToken];
      if(next){
        if(next[0]==='Lambda'){
          console.log(terStack.pop() + ' is Out');
        }else{
          terStack.pop();
          terStack.push(...next)
          
        }
      }else{
        console.log(`Error in line ${tokens[0].row} near token ${nextToken} WE EXPECTED ${currentRule}`);
        break;
      }
    }
    
  }
  if(!tokens?.length){
    console.log('MISSION ACCOMPLISHED');
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
