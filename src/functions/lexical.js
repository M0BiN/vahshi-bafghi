import {checkSyntax} from './SyntaxAnalyzer';

const regex = /(((?:@[a-zA-Z]\w*)\b)|("[^"]*")|(\b\d+\.\d+\b)|(\b\d+\b)|(\!)|(=)|(\+)|(\-)|(\/)|(\*)|(\%)|(\^)|(#)|(\()|(\))|(<<)|(>>)|(as)|(ifn)|(loop)|(on)|(by)|(say)|(get)|(finally)|(until)|((?:::)|(?:\\:))|((?:>:)|(?:<:)|(?:[><]))|(\&)|(\|)|({(?!.*)}))/gi;
export const getTokens = (input, tokens = []) => {
    for (let match = regex.exec(input); match; match = regex.exec(input))
    tokens = [...tokens,{value: match[0],row: match.index,
      group: match.reduce((ac, v, i) => (v && i > 1 && i < ac ? i : ac),Infinity),},];
      checkSyntax(tokens);
    return tokens;};

