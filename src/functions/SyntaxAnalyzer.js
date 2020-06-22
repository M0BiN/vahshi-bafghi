import {parseTable,parseTable22} from './parseTable'
import { configure } from '@testing-library/react';
export const checkSyntax = (tokens, errorManager)=>{
 
  
  let terStack = ['$','S'];
  //console.log(recToGod('S',tokens))
  //return;

  
  while(tokens?.length){
    let currentRule = terStack[terStack.length-1];
    let nextToken = getType[tokens[0].group];
    if(isTerminal(currentRule)){
      if(currentRule===nextToken){
        //console.log(terStack.pop() + ' Go Top')
        //console.log(tokens[0].value)
        terStack.pop();
        tokens.shift();

      }else{
        errorManager(`SyntaxError: Unexpected token: \`${tokens[0].value}\` ,Expected \`${currentRule}\` near line: ${tokens[0].line} `);
        break;
      } 
    }else{
      let next = parseTable[currentRule]?.[nextToken];
      if(next){
        if(next[0]==='Lambda'){
          terStack.pop();
          //console.log(terStack.pop() + ' Removed')
          
        }else{
          terStack.pop()
          // console.log(terStack.pop()+' DDDDDDDDDdown');
          // console.log(next)
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





















  // while(tokens?.length){
  //   let currentRule = terStack[terStack.length-1];
  //   let nextToken = getType[tokens[0].group];
  //   if(isTerminal(currentRule)){
  //     if(currentRule===nextToken){
  //       console.log(terStack.pop() + ' Go Top')
  //       console.log(tokens[0].value)
  //       tokens.shift();
        
        

  //     }else{
  //       errorManager(`SyntaxError: Unexpected token: \`${tokens[0].value}\` ,Expected \`${currentRule}\` near line: ${tokens[0].line} `);
  //       break;
  //     } 
  //   }else{
  //     let next = parseTable[currentRule][nextToken];
  //     if(next){
  //       if(next[0]==='Lambda'){
  //         console.log(terStack.pop() + ' Removed')
          
  //       }else{
  //         console.log(terStack.pop()+' DDDDDDDDDdown');
  //         console.log(next)
  //         terStack.push(...next);
          
          
  //       }
  //     }else{
  //       errorManager(`SyntaxError: Unexpected token: \`${tokens[0].value}\` near line ${tokens[0].line} `);
  //       break;
  //     }
  //   }
    
  // }
  // if(!tokens?.length){
  //   //console.log('MISSION ACCOMPLISHED');
  //   errorManager(false)
  // }


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





// Stack = Function
// Tokens [$,S]

// const recToGod = (rule, tokens)=>{
//     if(!tokens?.length)return [];
//     if(isTerminal(rule)){
//       let c = tokens.shift();
//       console.log(c)
//       return rule===getType[c.group] ?  c: undefined;
//     }
    
//     let rules = parseTable22[rule][getType[tokens[0].group]];
//     let data = [];
//     if(rules){
//       if(rules[0]==='Lambda') return [];
//       for(let i = 0; i < rules.length; i++){
//         let result = recToGod(rules[i], tokens);
//         if(!result) return undefined;
//         if(result.length !==0) data.push(result);
        
//       }
//     }else return undefined;
//      return data.length > 1 ? data : data[0];
// }




// const parser = (currentRule, tokens)=>{
//   if(tokens.isEmpty()) return [];
//   if(isTerminal(rule)){
//     let currentToken = tokens.pop();
//     if(currentRule===currentToken) return currentToken;
//     else throw error;
//   }
//   let nextRule = parseTable[currentRule][tokens.peek()];
//   let data = [];
//   if(nextRule){
//     if(rules[0]==='epsilon') return [];
//     for(let i = 0; i < rules.length; i++){
//       let result = parser(rules[i], tokens);
//       if(!result) throw error;
//       if(result.length !==0) data.push(result);
      
//     }
//   }else throw error;
//    return data.length > 1 ? data : data[0];
// }