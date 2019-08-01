// let program = require("commander");
// const Table = require('cli-table2') // 表格输出
// const superagent = require('superagent') // http请求
// let gs = require('nodegrass');
let fs = require("fs");
let path = require('path');
let re =  /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/; // 判断是否有汉字的正则表达式
let reg = /[\u4e00-\u9fa5]*/g
let wordList = [];



function readFileContent(filePath) {
    console.log(filePath, '====');
    let data = fs.readFileSync(filePath, "utf-8")
    let colomn = data.split("\n");
    let str = data;
    let result = []
    let resultArray = []

    for(let item = 0; item<colomn.length; item++){

        if(re.test(colomn[item]) && colomn[item].trim() != ''){  //如果有汉字，输出文件和所在行数

            // result.push(item+1);
            // result.push(colomn[item])
            if (colomn[item].match(reg) && colomn[item].indexOf('<!--') < 0 && colomn[item].indexOf('-->') < 0 && colomn[item].indexOf('//') < 0) {
                colomn[item].match(reg).filter(v => v).forEach(v => {
                    if (wordList.indexOf(v) === -1) {
                        wordList.push(v);
                        resultArray.push(v);
                    }
                    let r = new RegExp('>' + v + '<', 'g');
                    str = str.replace(r, (a, b, c) => {
                        console.log(a);
                        let s = a.replace(/[><]/g, '');
                        return `>{{i18n.t('${s}')}}<`
                    });
                });
                // result.push(colomn[item].match(reg).filter(v => v).join(','))
                // resultArray.push(.join(','));
            }

            // resultArray.push(colomn[item].match(reg).join(''));
            result = [];
        }
    }
    // let l = JSON.stringify(Object.assign([], resultArray));
    // let dd = fs.readFileSync('message.txt','utf-8');
    // l = l.replace(/[\[\]]/g, '');
    // console.log(l, '======');
    fs.writeFileSync(filePath, `${str}`, {flag:'w', encoding:'utf-8', mode:'0666'});
}


function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath)
    //遍历读取到的文件列表
    files.forEach(function(filename){
        //获取当前文件的绝对路径
        let filedir = path.join(filePath,filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        let stats = fs.statSync(filedir)
        let isFile = stats.isFile();//是文件
        let isDir = stats.isDirectory();//是文件夹
        if(isFile){
            if(filedir.indexOf(".DS_Store") == -1){
                readFileContent("./"+filedir)
            }
        }
        if(isDir){
            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
    });
}


function isPathExist() {
    return fs.access(url);
}
 // readFileContent('./test/1.html');
//fileDisplay("./test")

function commander() {
    // program
    //     .version('0.0.1')
    //     .option("-s,--search <string>", "search path to find Chinese character!")
    //     .parse(process.argv)
    // console.log(program, '=============================');
    fs.writeFileSync('message.txt', '');
    fileDisplay('./')
    // readFileContent('./src/components/agency/agencyBetDetail.vue')
    let l = JSON.stringify(Object.assign([], wordList));
    fs.writeFileSync(`message.txt`, `${l}`, {flag:'w', encoding:'utf-8', mode:'0666'});
    // console.log('结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束');
    // if(program.search){
    //     let pathName = program.search.toString();
    //     console.log(pathName, '=============================');
    //     fs.access(pathName,function (err) {
    //         if(err){
    //             console.log("目录不存在")
    //         }else{
    //             fileDisplay(pathName)
    //         }

    //     })
    // }
}

commander();
