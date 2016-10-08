'use strict';
let iniParser = (str) => {
    let result = {
        length: 0
    };
    let section = false;
    let lines = str.replace(/(\r\n)/g,'\n').split('\n');
    lines.reduce((c,l,i) => {
        if(/^\[(.*)\]$/g.test(l)) {
            section = /^\[(.*)\]$/g.exec(l)[1];
            result[section] = {
                length: 0
            };
            result[result.length] = section;
            result.length++;
        } else if(/^(\w*)=(.*)$/g.test(l)) {
            let line = /^(\w*)=(.*)$/g.exec(l);
            let parent = section ? result[section] : result;
            parent[line[1]] = line[2];
            parent[parent.length] = line[1];
            parent.length++;
        }
        return;
    }, null);
    return result;
};

export default iniParser;