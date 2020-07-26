
const SemanticAnalyzer = (ast, em, start) => {
    console.log(ast)
  //console.log(evaluate(ast.filter()))
  
let a =  ast?.some((v) => {
      if(hasBody(v)) SemanticAnalyzer(v.body, em);
      
      if(v.init){
          if(!evaluate(v.init, em)){
                return true;
          }
      }
      if(v.condition){
        if(!evaluate(v.condition, em)){
              return true;
        }
    }
    if(v.alternate){
        SemanticAnalyzer(v?.alternate?.body, em);
        if(!evaluate(v?.alternate?.condition, em)){
              return true;
        }
    }
    if(v.finally){
        SemanticAnalyzer(v?.finally?.body, em);
        
    }
      
  });
  if(!a && start)em(false);
  

};

const evaluate = (exp, errorManager) => {
  if (isLiteral(exp)) return exp;
  console.log(exp)
  const left = evaluate(exp.leftChild, errorManager);
  const right = evaluate(exp.rightChild, errorManager);
  const resultType = validation[left.type]?.[right.type]?.(exp.operator);
  if(resultType){
      return {type:resultType, ...exp}
  }
  errorManager({code:4, left, right, operator:exp.operator});
//   switch (exp.operator) {
//     case "+":
//       return left + right;
//     case "-":
//       return left - right;
//     case "*":
//       return left * right;
//     case "/":
//       return left / right;
//     case "^":
//       return left ^ right;
//   }
};

export default SemanticAnalyzer;
const validation = {
  STRING: {
    STRING: (operator) => (operator === "+" ? "STRING" : isComp1(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    INTEGER: (operator) => (operator === "+" ? "STRING" : isLogicComp(operator) ? 'BOOLEAN' : null) ,
    FLOAT: (operator) => (operator === "+" ? "STRING" : isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (operator === "+" ? "VARIABLE" : isComp1(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator),
    
  },
  INTEGER: {
    INTEGER: (operator) => (isOperator(operator) ? "INTEGER" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    FLOAT: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator),
    STRING: (operator) => LogicalType(operator),
  },
  FLOAT: {
    INTEGER: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    FLOAT: (operator) => (isOperator(operator) ? "FLOAT" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator),
    STRING: (operator) => LogicalType(operator),
  },
  VARIABLE: {
    INTEGER: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    FLOAT: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    VARIABLE: (operator) => (isOperator(operator) ? "VARIABLE" : isComparison(operator) || isLogicComp(operator) ? 'BOOLEAN' : null),
    BOOLEAN: (operator) => LogicalType(operator),
    STRING: (operator) => LogicalType(operator),
  },
  BOOLEAN: {
    INTEGER: (operator) => LogicalType(operator),
    FLOAT: (operator) => LogicalType(operator),
    VARIABLE: (operator) => LogicalType(operator),
    BOOLEAN: (operator) => LogicalType(operator),
    STRING: (operator) => LogicalType(operator),
  },
};

const LogicalType = (v) => (isLogicComp(v) ? 'BOOLEAN' : null);

const isMathOperator = (v) => ['+','-','*','/'].includes(v?.type);

const isComparison = (v) => isComp1(v) || isComp2(v);

const isComp1 = (v) =>['COMP1'].includes(v?.type);
    
const isComp2 = (v) => ['COMP2'].includes(v?.type);
    
const isLogicComp = (v) => ['AND','OR'].includes(v?.type);
    
const hasBody = (v) => ['UntileStatement','LoopStatement','FINALLY','IfnStatement','AsStatement'].includes(v.type);

const isLiteral = (v) =>['STRING','FLOAT','INTEGER','BOOLEAN','VARIABLE'].includes(v?.type);

const isOperator = (v) => ['MATH_OPERATOR','SIGN'].includes(v?.type);
