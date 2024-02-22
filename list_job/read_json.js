const fs = require("fs");
const path = require('path');


var work_dir = path.resolve(__dirname);
var files = fs.readdirSync(work_dir);
files.forEach((file)=>{
    if (path.extname(file) === '.json'){
        var f = fs.readFileSync(`${work_dir}/${file}`, 'utf-8')
        var j_son = JSON.parse(f)
        console.log(j_son)  
    }

})





