import {checkSyntax} from './SyntaxAnalyzer';
import {getType} from '../component/token-table/token-table.component';
const regex = /(((?:@[a-zA-Z]\w*)\b)|("[^"]*")|(\b\d+\.\d+\b)|(\b\d+\b)|(\!)|(=)|(\+)|(\-)|(\/)|(\*)|(\%)|(\^)|(#)|(\()|(\))|(<<)|(>>)|(as)|(ifn)|(loop)|(on)|(by)|(say)|(get)|(finally)|(until)|((?:::)|(?:\\:))|((?:>:)|(?:<:)|(?:[><]))|(\&)|(\|)|({.*})|(\n)|([^\s]+))/gi;

export const getTokens = (input,  errorManager, tokens = []) => {
  regex.lastIndex = 0;
   let line = 1;

    for (let match = regex.exec(input); match; match = regex.exec(input)){
      if(!isToken(match)){
        errorManager({code:1, token:match[0], line});
        
        return [];
      }
      if(isLine(match))line++;
      else tokens = addToken(match) ? [...tokens,{value: match[0],row: match.index, line, group: getGroup(match), type:getType[getGroup(match)]}] : tokens;
    }
    
    
   checkSyntax(JSON.parse(JSON.stringify([...tokens, {value: '$',row: 0, line, group: 0, type:'$'}])), errorManager);
   //checkSyntax(JSON.parse(JSON.stringify(tokens)), errorManager);
   //console.log(tokens)
    return tokens;
  };


















const isToken = (token)=> getGroup(token) !== 34 ;
const isLine = (token)=> getGroup(token) === 33 ;
const getGroup = (match)=> match.reduce((ac, v, i) => (v && i > 1 && i < ac ? i : ac),Infinity);
const addToken = (token)=>{
  if(getGroup(token) === 32){
    //line = line+1;
    return false;
  }
  return getGroup(token) !== 33;
} 
