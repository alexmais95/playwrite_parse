const fs = require("fs");
const path = require('path');


var work_dir = path.resolve(__dirname);
var files = fs.readdirSync(work_dir);
files.forEach((file)=>{
    if (path.extname(file) === '.json'){
        fs.unlinkSync(`${work_dir}/${file}`);
    }

})