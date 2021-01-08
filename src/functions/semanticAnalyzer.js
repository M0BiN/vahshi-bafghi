
const SemanticAnalyzer = (ast, em, start) => {
  console.log(ast)
  try {
 const result = DFS(ast);
  if(result)em(false);
}catch(e){
  em(e);
}
};



const isLoop = (current) => ['LoopStatement','UntileStatement'].includes(current.type);

const DFS = (ast, loopParent)=>{
  for(let i = 0; i < ast.length; i++){
    const current = ast[i];
    const currentparent = isLoop(current) ? true : loopParent;
    //console.log(current)
    if(current.type === 'BreakStatement'){
      if(!loopParent){
        throw {code:7};
      }
    }
    if(current.init){
      if(!evaluate(current.init, currentparent)){
            return;
      }
  }
  if(current.condition){
    if(!evaluate(current.condition, currentparent)){
          return;
    }
}
if(hasBody(current) && !DFS(current.body, currentparent)){
  return;
}

if(current.alternate){
  if(!evaluate(current?.alternate?.condition, currentparent)){
    return;
}
if(!DFS([current?.alternate], currentparent)){
  return;
}
    
    
}
if(current.finally && !DFS([current?.finally], currentparent)){
  return;
  
}



  }
  
return true;
}











const evaluate = (exp) => {
  
  if (isLiteral(exp)) return {...exp, evaluateType:(exp?.evaluateType)?(exp?.evaluateType):exp.type,};
  if (isUnary(exp)) return {...exp, evaluateType:evaUnary(evaluate(exp.init),exp.operator) };
  const left = evaluate(exp.leftChild);
  const right = evaluate(exp.rightChild);
  const resultType = validation[left?.evaluateType]?.[right?.evaluateType]?.(exp?.operator);
  
  if(resultType){
    const result = getResult(left, right, exp.operator, resultType);
    let a = result ? {...left, value:result.value, evaluateType:result.evaluateType } : {...exp,evaluateType:resultType} ;
    console.log(a)
    return a;
  } 
  
  throw {code:4, left, right, operator:exp.operator};
//@age = 20/ ( 10/10 - 1)#

};

export default SemanticAnalyzer;













const validation = {
  STRING: {
    STRING: (operator) => (operator?.value === "+" ? "STRING" : isComp1(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    INTEGER: (operator) => (operator?.value === "+" ? "STRING" : isLogicComp(operator) ? 'BOOLEAN' : null) ,
    FLOAT: (operator) => (operator?.value === "+" ? "STRING" : isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (operator?.value === "+" ? "VARIABLE" : isComp1(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator)? 'BOOLEAN' : null,
    
  },
  INTEGER: {
    INTEGER: (operator) => (isOperator(operator) ? "INTEGER" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    FLOAT: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator),
    //STRING: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    STRING: (operator) => (operator?.value === "+" ? "STRING" : isLogicComp(operator) ? 'BOOLEAN' : null) ,

  },
  FLOAT: {
    INTEGER: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    FLOAT: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    STRING: (operator) => LogicalType(operator)? 'BOOLEAN' : null,
  },
  VARIABLE: {
    INTEGER: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'VARIABLE' : null),
    FLOAT: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'VARIABLE' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'VARIABLE' : null),
    BOOLEAN: (operator) => LogicalType(operator) ? 'VARIABLE' : null,
    STRING: (operator) => LogicalType(operator)? 'VARIABLE' : null,
  },
  BOOLEAN: {
    INTEGER: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    FLOAT: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    VARIABLE: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    BOOLEAN: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
    STRING: (operator) => LogicalType(operator) ? 'BOOLEAN' : null,
  },
};

const LogicalType = (v) => (isLogicComp(v) ? 'BOOLEAN' : null);

const isMathOperator = (v) => ['+','-','*','/'].includes(v?.type);

const isComparison = (v) => isComp1(v) || isComp2(v);

const isComp1 = (v) =>['COMP1'].includes(v?.type);
    
const isComp2 = (v) => ['COMP2'].includes(v?.type);
    
const isLogicComp = (v) => ['AND','OR'].includes(v?.type);
    
const hasBody = (v) => ['UntileStatement','LoopStatement','FINALLY','IfnStatement','AsStatement'].includes(v?.type);

const isLiteral = (v) =>['STRING','FLOAT','INTEGER','BOOLEAN','VARIABLE'].includes(v?.type);

const isOperator = (v) => {console.log(v); return['MATH_OPERATOR','SIGN','POWER'].includes(v?.type)};

const isUnary = (v) => ['UnaryExpression'].includes(v?.type);

const evaUnary = (exp, operator)=>{

  switch(exp.evaluateType + operator.value){


    case `INTEGER+`:return exp;
    case `INTEGER-`:return {...exp,evaluateType:'INTEGER', value:""+parseInt(exp.value)*-1};

    case `FLOAT+`:return exp;
    case `FLOAT-`:return {...exp,evaluateType:'FLOAT', value:""+parseFloat(exp.value)*-1};

    case `VARIABLE+`:return {...exp, evaluateType:'VARIABLE',};
    case `VARIABLE-`:return {...exp, evaluateType:'VARIABLE',};

    case `FLOAT!`:return {...exp,evaluateType:'BOOLEAN',};
    case `INTEGER!`:return {...exp, evaluateType:'BOOLEAN',};
    case `STRING!`:return {...exp,evaluateType:'BOOLEAN',};
    case `VARIABLE!`:return {...exp,evaluateType:'BOOLEAN',};
    case `BOOLEAN!`:return {...exp,evaluateType:'BOOLEAN',};

    default: throw {code:5, left:exp, operator};

  }
  
}

const getResult = (left, right, operator, resultType) => {
  
  switch (operator.value + resultType) {
    case "+STRING":
      return {evaluateType:resultType, value: left.value + right.value};
    case "+INTEGER":
      return {evaluateType:resultType, value: parseInt(left.value) + parseInt(right.value)};
    case "-INTEGER":
      return {evaluateType:resultType, value: parseInt(left.value) - parseInt(right.value)};
    case "*INTEGER":
      return {evaluateType:resultType, value: parseInt(left.value) * parseInt(right.value)};
    case "/INTEGER":{
      if(parseInt(right.value)===0){
        throw {code:6, line:left.line}
      }
      if(parseInt(left.value) % parseInt(right.value) === 0){
          
          return {evaluateType:resultType, value: parseInt(left.value) / parseInt(right.value)};
      };
      return {evaluateType:`FLOAT`, value: parseFloat(left.value) / parseFloat(right.value)}
      
    }
    case "^INTEGER":
      return {evaluateType:resultType, value: parseInt(left.value) ** parseInt(right.value)};
    case "+FLOAT":
      return {evaluateType:resultType, value: parseFloat(left.value) + parseFloat(right.value)};
    case "-FLOAT":
      return {evaluateType:resultType, value: parseFloat(left.value) - parseFloat(right.value)};
    case "*FLOAT":
      return {evaluateType:resultType, value: parseFloat(left.value) * parseFloat(right.value)};
    case "/FLOAT":{
      if(parseFloat(right.value)===0){
        throw {code:6, line:left.line}
      }
      return {evaluateType:resultType, value: parseFloat(left.value) / parseFloat(right.value)};
    }
      
    case "^FLOAT":
      return {evaluateType:resultType, value: parseFloat(left.value) ^ parseFloat(right.value)};
  }
};