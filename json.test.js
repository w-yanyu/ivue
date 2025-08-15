var fs = require('fs');
var path = require('path');
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else { 
          if(/\.json$/.test(item)){
            fs.readFile(fullPath,function(err,data){
              try{
                JSON.parse(data);
              }catch(e){
                console.error(fullPath+":json格式错误",e)
              }
            })
            filesList.push(fullPath);
          }               
        }        
    });
    return filesList;
}


var filesList = [];
readFileList('./src',filesList);