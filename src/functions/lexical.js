import {checkSyntax} from './SyntaxAnalyzer';
const regex = /(((?:@[a-zA-Z]\w*)\b)|("[^"]*")|(\b\d+\.\d+\b)|(\b\d+\b)|(\!)|(=)|(\+)|(\-)|(\/)|(\*)|(\%)|(\^)|(#)|(\()|(\))|(<<)|(>>)|(as)|(ifn)|(loop)|(on)|(by)|(say)|(get)|(finally)|(until)|((?:::)|(?:\\:))|((?:>:)|(?:<:)|(?:[><]))|(\&)|(\|)|({.*})|(\n)|([^\s]+))/gi;
var line;
export const getTokens = (input,  errorManager, tokens = []) => {
  regex.lastIndex = 0;
   line = 1;

    for (let match = regex.exec(input); match; match = regex.exec(input)){
      if(!isToken(match)){
        errorManager(`LexicalError: unknown token \`${match[0].value}\` near line ${line}`);
        return [];
      }
      tokens = addToken(match) ? [...tokens,{value: match[0],row: match.index, line, group: getGroup(match)}] : tokens;
    }
   checkSyntax(JSON.parse(JSON.stringify(tokens)), errorManager);
    return tokens;
  };


















const isToken = (token)=> getGroup(token) !== 34 ;
const getGroup = (match)=> match.reduce((ac, v, i) => (v && i > 1 && i < ac ? i : ac),Infinity);
const addToken = (token)=>{
  if(getGroup(token) === 32){
    line = line+1;
    return false;
  }
  return getGroup(token) !== 33;
} 
