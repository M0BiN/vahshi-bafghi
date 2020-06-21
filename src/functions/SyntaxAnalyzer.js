import {parseTable} from './parseTable'
import { configure } from '@testing-library/react';
export const checkSyntax = (tokens, errorManager)=>{
  let terStack = ['$','S'];
  while(tokens?.length){
    let currentRule = terStack[terStack.length-1];
    let nextToken = getType[tokens[0].group];
    if(isTerminal(currentRule)){
      if(currentRule===nextToken){
        console.log(terStack.pop() + ' #########################')
        console.log(tokens[0].value)
        tokens.shift();
        
        

      }else{
        errorManager(`SyntaxError: Unexpected token: \`${tokens[0].value}\` ,Expected \`${currentRule}\` near line: ${tokens[0].line} `);
        break;
      } 
    }else{
      let next = parseTable[currentRule][nextToken];
      if(next){
        if(next[0]==='Lambda'){
          console.log(terStack.pop())
          
        }else{
          console.log(terStack.pop()+' DDDDDDDDDdown');
          terStack.push(...next);
          
          
        }
      }else{
        errorManager(`SyntaxError: Unexpected token: \`${tokens[0].value}\` near line ${tokens[0].line} `);
        break;
      }
    }
    
  }
  if(!tokens?.length){
    //console.log('MISSION ACCOMPLISHED');
    errorManager(false)
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
