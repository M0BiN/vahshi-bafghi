import {parseTable,parseTable22} from './parseTable'
import { configure } from '@testing-library/react';
import SemanticAnalyzer from './semanticAnalyzer';
let errorManager;


export const checkSyntax = (tokens, em, rulesStack = ['$','S'])=>{
  errorManager = em
  //console.log(tokens)
  let mainAST = {type:'Program', body:[]};
  let declareVarNode = {type:'DeclareVarStatement', Identifier:'varName',init:'Exp'};
  let expNode = {type:'Exp', operator:'', leftChild:'',rightChild:''};
  let untilNode = {type:'UntileStatement',Condition:'exp', body:[]};
  let asNode = {type:'UntileStatement',Condition:'exp', body:[], alternate:{}};
  let sayNode = {type:'SayStatement',exp:''};
  let loopNode = {type:'LoopStatement',Identifier:'varName',init:'Exp',step:'Exp',by:'', body:[]};
  let unaryExpNode = {type:'UnaryExpressionNode',operator:'', argument:{}};
  let literalNode = {type:'UnaryExpressionNode',value:'', argument:{}};

let k = myParser22(['S','$'],tokens);

if(k)SemanticAnalyzer(k.filter(v=>!['Lambda','$'].includes(v?.type)), em, 'start');


}











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
'UNTIL':true, 'COMP1':true,'COMP2':true,'AND':true,'OR':true,'COMMENT':true,'$':true};




// let mainAST = {type:'Program', body:[]};
// let declareVarNode = {type:'DeclareVarStatement', Identifier:'varName',init:'Exp'};
// let expNode = {type:'Exp', operator:'', leftChild:'',rightChild:''};
// let untilNode = {type:'UntileStatement',Condition:'exp', body:[]};
// let asNode = {type:'UntileStatement',Condition:'exp', body:[], alternate:{}};
// let sayNode = {type:'SayStatement',exp:''};
// let loopNode = {type:'LoopStatement',Identifier:'varName',init:'Exp',step:'Exp',by:'', body:[]};
// let unaryExpNode = {type:'UnaryExpressionNode',operator:'', argument:{}};
// let literalNode = {type:'UnaryExpressionNode',value:'', argument:{}};

const getNode = (rule)=>({

    S: (array)=>{
      
        let arr = array?.filter((v,i)=>v?.value!=='Lambda');
        return arr.length > 1 ? arr : arr[0];
    },
    Statement:  (array)=>array[0],
    DeclareVar:  (array)=>{
      
      let declareVarNode = {type:'DeclareVarStatement'};
      array.forEach(v=>{
        if(!declareVarNode.Identifier && v?.type==='VARIABLE'){
          declareVarNode = {...declareVarNode, Identifier:v}
        }else
        if(!declareVarNode.init && (v?.type==='VARIABLE' || v?.type==='Literal' || v?.type==='Exp' || isLiteral(v))){
          declareVarNode = {...declareVarNode, init:v}
        }
      })
      return declareVarNode;
     
      
    },
    DefineVar:  (array)=>{
      return  array
      let declareVarNode = {type:'DefineVar'};
      console.log('aaaaaahhhhhhhhaaaaaaaaaa')
      console.log(array)
      // array.forEach(v=>{
      //   if(!declareVarNode.Identifier && v?.type==='VARIABLE'){
      //     declareVarNode = {...declareVarNode, Identifier:v}
      //   }
      // })
      return declareVarNode;
    },
    Exp:    (array)=>{
      let expNode = {type:'Exp'};

      array = array.filter(v=>v.type!=='Lambda');
      if(array[array.length - 1]?.type === 'HalfExp'){
        let yaro = array.pop();
        array.push(yaro.operator, yaro.leftChild)
      }
      if(array.length === 1)return array[0];
      array.forEach(v=>{
        if(!expNode.leftChild && (v?.type==='VARIABLE' || v?.type==='Exp' ||v?.type==='Literal' || isLiteral(v))){
          expNode = {...expNode, leftChild:v}
        }else
        if(!expNode.operator && (isOperator(v) || v?.type==='HalfExp')){
          expNode = {...expNode, operator:v}
      }else
        if(!expNode.rightChild && (v?.type==='VARIABLE' || v?.type==='Exp'|| v?.type==='HalfExp'  ||v?.type==='Literal' || isLiteral(v))){
          expNode = {...expNode, rightChild:v}
      }
    })

    return expNode;
    },
    Exp2:   (array)=>getNode('Exp')(array),
    Exp3:   (array)=>{

      let expNode = {type:'HalfExp'};
      array = array.filter(v=>v.type!=='Lambda');
      if(array.length === 0)return {type:'Lambda'};
      array.forEach(v=>{
        if(!expNode.Exp && (v?.type==='VARIABLE' || v?.type==='Exp' ||v?.type==='Literal' ||v?.type==='UnaryExpression'  || isLiteral(v) )){
          expNode = {...expNode, leftChild:v}
        }else
        if(!expNode.operator && isOperator(v)){
          expNode = {...expNode, operator:v}
      }
    })
    
    return expNode;
    },
    Exp4:   (array)=> getNode('Exp')(array),
    Exp5:   (array)=>getNode('Exp3')(array),
    Exp6:   (array)=>getNode('Exp')(array),
    Exp7:   (array)=>getNode('Exp3')(array),
    Exp8:   (array)=>getNode('Exp')(array),
    Exp9:   (array)=>getNode('Exp3')(array),
    Exp10:  (array)=>getNode('Exp')(array),
    Exp11:  (array)=>getNode('Exp3')(array),
    Exp12:  (array)=>getNode('Exp')(array),
    Exp13:  (array)=>getNode('Exp3')(array),
    Exp14:  (array)=>{
      if(array.length===1)return array[0];
      let expNode = {type:'UnaryExpression'};
      array.forEach(v=>{
        if(v.type==='SIGN' || v.type==='NOT'){
          expNode['operator'] = v;
        }else expNode['argument'] = v;
        
      })
      return expNode;
    },
    Exp15:   (array)=>getNode('Exp3')(array),
    Exp16:   (array)=> {
      

      return array?.length === 1 ? array[0] : array[1]
    }
      ,
    Literal:  (array)=>array[0],
    AsStatement:  (array)=>{
      array = array.slice(2);
      let expNode = {type:'AsStatement', condition:array.shift(), body:[]};
      //let asNode = {type:'UntileStatement',Condition:'exp', body:[], alternate:{}};
      let last = array.pop();
      if(last.type==='FINALLY'){
        expNode.finally = last;
        last = array.pop();
      }
      if(last.type==='IfnStatement'){
        expNode.alternate = last;
        last = array.pop();
      }
      if(last.type==='CLOSE_STATEMENT'){
        //expNode.alternate = last;
        //last = array.pop();
      }
      array = array.slice(2).filter(v=>!['Lambda','CLOSE_STATEMENT'].includes(v?.type));
      while(array?.length)expNode.body.unshift(array.shift());
      return expNode;

      

      
    },
    IfnStatement:   (array)=>{
      if(array.length<=1)return{type:'Lambda'}
      array = array.slice(2);
      let expNode = {type:'IfnStatement', condition:array.shift(), body:[]};
      //let asNode = {type:'UntileStatement',Condition:'exp', body:[], alternate:{}};
      let last = array.pop();
      if(last.type==='FINALLY'){
        expNode.finally = last;
        last = array.pop();
      }
      if(last.type==='IfnStatement'){
        expNode.alternate = last;
        last = array.pop();
      }
      if(last.type==='CLOSE_STATEMENT'){
        //expNode.alternate = last;
        //last = array.pop();
      }
      array = array.slice(2).filter(v=>!['Lambda','CLOSE_STATEMENT'].includes(v?.type));
      while(array?.length)expNode.body.unshift(array.shift());
      return expNode;
    },
    FinallyStatement:   (array)=>{
      if(array?.length<=1)return{type:'Lambda'}
      array = array?.slice(2).filter(v=>v?.type!=='Lambda');;
      let expNode = {type:'FINALLY',  body:[]};
      //let asNode = {type:'UntileStatement',Condition:'exp', body:[], alternate:{}};
      let last = array?.pop();
      
      
      while(array?.length)expNode.body.unshift(array.shift());
      return expNode;
    },
    LoopStatement:  (array)=>({type:'LoopStatement',Identifier:array[3],init:array[1],stepSign:array[5],by:array[6], body:[...array.slice(8,-1).filter(v=>v?.type!=='Lambda')]}),
    StepSign:  (array)=>array[0],
    SayStatement:  (array)=> ({type:'SayStatement', init:array[1]}),
    UntilStatement:  (array)=>({type:'UntileStatement',condition:array[2], body:[...array.slice(5,-1).filter(v=>v?.type!=='Lambda')]}),
}
  
)[rule]




const isLiteral = (v)=>{
  return v?.type==='STRING' || v?.type==='FLOAT'|| v?.type==='INTEGER'
}
const isOperator = (v)=>{
  return v?.type==='MATH_OPERATOR' || v?.type==='SIGN' ||v?.type==='COMP1' ||v?.type==='COMP2' || v?.type==='AND' || v?.type==='OR'
}





const myParser22 = (rules, tokens)=>{
  let arr = [];
  for(let i = 0; i < rules.length; i++){

    if(rules[i]==='Lambda'){
      return [{type:'Lambda'}]
    }
    else if(isTerminal(rules[i])){
      let currentToken = tokens.shift();
      if(currentToken?.type===rules?.[i]){
        arr.push(currentToken);
      }else{
        errorManager({code:2, currentRule:rules?.[i], token:currentToken});
        return undefined;
      } 
    }else{
      let nextRules = parseTable22[rules?.[i]]?.[tokens[0]?.type];
      if(nextRules){
        let sub = myParser22(nextRules, tokens);
        if(sub){
          //console.log(sub)
          let out = getNode(rules[i])(sub);
          if (out instanceof Array){
            arr.push(...out);
          }else arr.push(out)
          
        }else return undefined;
       
       
      }else{ 
        errorManager({code:3,token:tokens[0]});
        return undefined;}
      
    }

  }
  return arr;
  

}