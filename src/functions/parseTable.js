export const parseTable22 = {
    S: {VARIABLE:['Statement','S'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'],as:['Statement','S'],loop:['Statement','S'],say:['Statement','S'],until:['Statement','S']},
    Statement: {VARIABLE:['DeclareVar','DELIMITER'],as:['AsStatement'],loop:['LoopStatement'],say:['SayStatement','DELIMITER'],until:['UntilStatement']},
    DeclareVar: {VARIABLE:['VARIABLE','DefineVar'],},
    DefineVar: {EQUAL:['EQUAL','Exp'],DELIMITER:['Lambda'],},
    Exp:   {VARIABLE:['Exp2','Exp3',],STRING:['Exp2','Exp3'],FLOAT:['Exp2','Exp3'],INTEGER:['Exp2','Exp3'],NOT:['Exp2','Exp3'],SIGN:['Exp2','Exp3'],LPAREN:['Exp2','Exp3'],GET:['Exp2','Exp3'],BOOLEAN:['Exp2','Exp3'],},
    Exp2:  {VARIABLE:['Exp4','Exp5',],STRING:['Exp4','Exp5'],FLOAT:['Exp4','Exp5'],INTEGER:['Exp4','Exp5'],NOT:['Exp4','Exp5'],SIGN:['Exp4','Exp5'],LPAREN:['Exp4','Exp5'],GET:['Exp4','Exp5'],BOOLEAN:['Exp4','Exp5'],},
    Exp3:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],OR:['OR','Exp'],ON:['Lambda']},
    Exp4:  {VARIABLE:['Exp6','Exp7',],STRING:['Exp6','Exp7'],FLOAT:['Exp6','Exp7'],INTEGER:['Exp6','Exp7'],NOT:['Exp6','Exp7'],SIGN:['Exp6','Exp7'],LPAREN:['Exp6','Exp7'],GET:['Exp6','Exp7'],BOOLEAN:['Exp6','Exp7'],},
    Exp5:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],OR:['Lambda'],AND:['AND','Exp2'], ON:['Lambda']},
    Exp6:  {VARIABLE:['Exp8','Exp9',],STRING:['Exp8','Exp9'],FLOAT:['Exp8','Exp9'],INTEGER:['Exp8','Exp9'],NOT:['Exp8','Exp9'],SIGN:['Exp8','Exp9'],LPAREN:['Exp8','Exp9'],GET:['Exp8','Exp9'],BOOLEAN:['Exp8','Exp9'],},
    Exp7:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['COMP1','Exp4'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp8:  {VARIABLE:['Exp10','Exp11',],STRING:['Exp10','Exp11'],FLOAT:['Exp10','Exp11'],INTEGER:['Exp10','Exp11'],NOT:['Exp10','Exp11'],SIGN:['Exp10','Exp11'],LPAREN:['Exp10','Exp11'],GET:['Exp10','Exp11'],BOOLEAN:['Exp10','Exp11'],},
    Exp9:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['COMP2','Exp6'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp10: {VARIABLE:['Exp12','Exp13',],STRING:['Exp12','Exp13'],FLOAT:['Exp12','Exp13'],INTEGER:['Exp12','Exp13'],NOT:['Exp12','Exp13'],SIGN:['Exp12','Exp13'],LPAREN:['Exp12','Exp13'],GET:['Exp12','Exp13'],BOOLEAN:['Exp12','Exp13'],},
    Exp11: {SIGN:['SIGN','Exp8'],DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp12: {VARIABLE:['Exp14','Exp15',],STRING:['Exp14','Exp15'],FLOAT:['Exp14','Exp15'],INTEGER:['Exp14','Exp15'],NOT:['Exp14','Exp15'],SIGN:['Exp14','Exp15'],LPAREN:['Exp14','Exp15'],GET:['Exp14','Exp15'],BOOLEAN:['Exp14','Exp15'],},
    Exp13: {SIGN:['Lambda'],MATH_OPERATOR:['MATH_OPERATOR','Exp10'], DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp14: {VARIABLE:['Exp16'],STRING:['Exp16'],FLOAT:['Exp16'],INTEGER:['Exp16'],NOT:['NOT','Exp16'],SIGN:['SIGN','Exp16'],LPAREN:['Exp16'],GET:['Exp16'],BOOLEAN:['Exp16'],},
    Exp15:  {SIGN:['Lambda'],MATH_OPERATOR:['Lambda'], DELIMITER:['Lambda'],POWER:['POWER','Exp12'], RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp16: {VARIABLE:['Literal'],STRING:['Literal'],FLOAT:['Literal'],INTEGER:['Literal'],NOT:['Literal'],SIGN:['Literal'],LPAREN:['LPAREN','Exp','RPAREN'],GET:['Literal'],BOOLEAN:['Literal'],},
    Literal: {VARIABLE:['VARIABLE'],STRING:['STRING'],FLOAT:['FLOAT'],INTEGER:['INTEGER'],GET:['GET'],BOOLEAN:['BOOLEAN']},
    AsStatement: {AS:['AS','LPAREN','Exp','RPAREN','OPEN_STATEMENT','S','CLOSE_STATEMENT','IfnStatement','FinallyStatement']},
    IfnStatement: {VARIABLE:['Lambda'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'], AS:['Lambda'],IfnStatement:['IfnStatement','LPAREN','Exp','RPAREN','OPEN_STATEMENT','S','CLOSE_STATEMENT','IfnStatement'], LOOP:['Lambda'],SAY:['Lambda'],UNTIL:['Lambda']},
    FinallyStatement: {VARIABLE:['Lambda'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'], FINALLY:['FINALLY','OPEN_STATEMENT','S','CLOSE_STATEMENT'], LOOP:['Lambda'],SAY:['Lambda'],UNTIL:['Lambda']},
    LoopStatement: {LOOP:['LOOP','Exp','ON','VARIABLE','BY','StepSign','INTEGER','OPEN_STATEMENT','S','CLOSE_STATEMENT']},
    StepSign: {SIGN:['SIGN'],MATH_OPERATOR:['MATH_OPERATOR'],SAY:['SAY','Exp']},
    SayStatement: {SAY:['SAY','Exp']},
    UntilStatement: {UNTIL:['UNTIL','LPAREN','Exp','RPAREN','OPEN_STATEMENT','S','CLOSE_STATEMENT']},
  };
  


  export const parseTable = {
    S: {VARIABLE:['S','Statement'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'],AS:['S','Statement'],LOOP:['S','Statement'],SAY:['S','Statement'],UNTIL:['S','Statement']},
    Statement: {VARIABLE:['DELIMITER','DeclareVar'],AS:['AsStatement'],LOOP:['LoopStatement'],SAY:['DELIMITER','SayStatement'],UNTIL:['UntilStatement']},
    DeclareVar: {VARIABLE:['DefineVar','VARIABLE'],},
    DefineVar: {EQUAL:['Exp','EQUAL'],DELIMITER:['Lambda'],},
    Exp:   {VARIABLE:['Exp3','Exp2'],STRING:['Exp3','Exp2'],FLOAT:['Exp3','Exp2'],INTEGER:['Exp3','Exp2'],NOT:['Exp3','Exp2'],SIGN:['Exp3','Exp2'],LPAREN:['Exp3','Exp2'],GET:['Exp3','Exp2'],BOOLEAN:['Exp3','Exp2'],},
    Exp2:  {VARIABLE:['Exp5','Exp4'],STRING:['Exp5','Exp4'],FLOAT:['Exp5','Exp4'],INTEGER:['Exp5','Exp4'],NOT:['Exp5','Exp4'],SIGN:['Exp5','Exp4'],LPAREN:['Exp5','Exp4'],GET:['Exp5','Exp4'],BOOLEAN:['Exp5','Exp4'],},
    Exp3:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],OR:['Exp','OR'],ON:['Lambda']},
    Exp4:  {VARIABLE:['Exp7','Exp6'],STRING:['Exp7','Exp6'],FLOAT:['Exp7','Exp6'],INTEGER:['Exp7','Exp6'],NOT:['Exp7','Exp6'],SIGN:['Exp7','Exp6'],LPAREN:['Exp7','Exp6'],GET:['Exp7','Exp6'],BOOLEAN:['Exp7','Exp6'],},
    Exp5:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],OR:['Lambda'],AND:['Exp2','AND'], ON:['Lambda']},
    Exp6:  {VARIABLE:['Exp9','Exp8'],STRING:['Exp9','Exp8'],FLOAT:['Exp9','Exp8'],INTEGER:['Exp9','Exp8'],NOT:['Exp9','Exp8'],SIGN:['Exp9','Exp8'],LPAREN:['Exp9','Exp8'],GET:['Exp9','Exp8'],BOOLEAN:['Exp9','Exp8'],},
    Exp7:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Exp4','COMP1'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp8:  {VARIABLE:['Exp11','Exp10'],STRING:['Exp11','Exp10'],FLOAT:['Exp11','Exp10'],INTEGER:['Exp11','Exp10'],NOT:['Exp11','Exp10'],SIGN:['Exp11','Exp10'],LPAREN:['Exp11','Exp10'],GET:['Exp11','Exp10'],BOOLEAN:['Exp11','Exp10'],},
    Exp9:  {DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Exp6','COMP2'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp10: {VARIABLE:['Exp13','Exp12'],STRING:['Exp13','Exp12'],FLOAT:['Exp13','Exp12'],INTEGER:['Exp13','Exp12'],NOT:['Exp13','Exp12'],SIGN:['Exp13','Exp12'],LPAREN:['Exp13','Exp12'],GET:['Exp13','Exp12'],BOOLEAN:['Exp13','Exp12'],},
    Exp11: {SIGN:['Exp8','SIGN'],DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp12: {VARIABLE:['Exp15','Exp14'],STRING:['Exp15','Exp14'],FLOAT:['Exp15','Exp14'],INTEGER:['Exp15','Exp14'],NOT:['Exp15','Exp14'],SIGN:['Exp15','Exp14'],LPAREN:['Exp15','Exp14'],GET:['Exp15','Exp14'],BOOLEAN:['Exp15','Exp14'],},
    Exp13: {SIGN:['Lambda'],MATH_OPERATOR:['Exp10','MATH_OPERATOR'], DELIMITER:['Lambda'],RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp14: {VARIABLE:['Exp16'],STRING:['Exp16'],FLOAT:['Exp16'],INTEGER:['Exp16'],NOT:['Exp16','NOT'],SIGN:['Exp16','SIGN'],LPAREN:['Exp16'],GET:['Exp16'],BOOLEAN:['Exp16'],},
    Exp15:  {SIGN:['Lambda'],MATH_OPERATOR:['Lambda'], DELIMITER:['Lambda'],POWER:['Exp12','POWER'], RPAREN:['Lambda'],COMP1:['Lambda'],COMP2:['Lambda'],OR:['Lambda'],AND:['Lambda'], ON:['Lambda']},
    Exp16: {VARIABLE:['Literal'],STRING:['Literal'],FLOAT:['Literal'],INTEGER:['Literal'],NOT:['Literal'],SIGN:['Literal'],LPAREN:['RPAREN','Exp','LPAREN'],GET:['Literal'],BOOLEAN:['Literal'],},
    Literal: {VARIABLE:['VARIABLE'],STRING:['STRING'],FLOAT:['FLOAT'],INTEGER:['INTEGER'],GET:['GET'],BOOLEAN:['BOOLEAN']},
    AsStatement: {AS:['FinallyStatement','IfnStatement','CLOSE_STATEMENT','S','OPEN_STATEMENT','RPAREN','Exp','LPAREN','AS']},
    IfnStatement: {VARIABLE:['Lambda'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'], AS:['Lambda'],IFN:['IfnStatement','CLOSE_STATEMENT','S','OPEN_STATEMENT','RPAREN','Exp','LPAREN','IFN'], LOOP:['Lambda'],SAY:['Lambda'],UNTIL:['Lambda'],FINALLY:['Lambda']},
    FinallyStatement: {VARIABLE:['Lambda'],CLOSE_STATEMENT:['Lambda'],$:['Lambda'], FINALLY:['CLOSE_STATEMENT','S','OPEN_STATEMENT','FINALLY'], LOOP:['Lambda'],SAY:['Lambda'],UNTIL:['Lambda']},
    LoopStatement: {LOOP:['CLOSE_STATEMENT','S','OPEN_STATEMENT','INTEGER','StepSign','BY','VARIABLE','ON','Exp','LOOP']},
    StepSign: {SIGN:['SIGN'],MATH_OPERATOR:['MATH_OPERATOR'],SAY:['Exp','SAY']},
    SayStatement: {SAY:['Exp','SAY']},
    UntilStatement: {UNTIL:['CLOSE_STATEMENT','S','OPEN_STATEMENT','RPAREN','Exp','LPAREN','UNTIL']},
  };