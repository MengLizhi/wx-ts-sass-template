const fs = require('fs');
const path = require('path')
let hit = {
    type: null,
    index: null,
    func: null
}
let TargetName = ""

// console.log("是否能读取模板：" + isFolderAccess(path.join(__dirname,'template','default')).R );

process.argv.forEach((optionName, index) => {
    switch (optionName) {
        case '--page':
            hit.type = 'Page'
            hit.index = index + 1
            hit.func = newPage
            console.log('page');
            break;
        case '--component':
            hit.type = 'Component'
            hit.index = index + 1
            hit.func = newComponent
            break;
        case '-p':
            hit.type = 'Page'
            hit.index = index + 1
            hit.func = newPage
            console.log('page');
            break;
        case '-c':
            hit.type = 'newComponent'
            hit.index = index + 1
            hit.func = newComponent
            break;
        case 'help':
            HelpDoc()
            break;
        case '-h':
            HelpDoc()
            break;
        case '--help':
            HelpDoc()
            break;
        default:
            if (hit.index) {
                TargetName = optionName
                hit.func(optionName)
                hit.type = null
                hit.index = null
            }
            break;
    }
})

function HelpDoc(params) {
    console.log(`
文件创建脚本
npm run new-file -- [-<p | c> <file name>] | [--<page | component> <file name>]
"-p" 和 "--page" 表示创建页面文件,
"-c" 和 "--component" 表示创建组件文件
    `);
}

function newPage(name) {
    const target = path.join(__dirname,'src','pages',name)
    const source = path.join(__dirname,'template','pages')
    newFile(source, target)
    let appJsonPath = path.join(__dirname,'src','app.json')
    let appJson = fs.readFileSync(appJsonPath, {
        encoding: "utf-8",
        flag: 'r'
    })
    appJson = JSON.parse(appJson)
    if (appJson.pages[appJson.pages.length - 1] !== `pages/${name}/${name}`) {
        appJson.pages.push(`pages/${name}/${name}`)
    }
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2))
}

function newComponent(name) {

    const target = path.join(__dirname,'src','component',name)
    const source = path.join(__dirname,'template','component')
    
    newFile(source, target)
}

function newFile(source, target) {
    if( isFolderAccess(target).W ) {
        copyFolder(source, target)
    } else {
        fs.mkdirSync(target)
        copyFolder(source, target)
    }
}

function isFolderAccess(filePath) {
    let fileAccess = {
        W: false,
        R: false
    }
    try {
        fs.accessSync(filePath, fs.constants.F_OK)

        try {
            fs.accessSync(filePath, fs.constants.W_OK)
            fileAccess.W = true
        } catch (error) {
            console.log(`${filePath} 无法写入`);
            console.log(error);
            fileAccess.W = false
        }
        
        try {
            fs.accessSync(filePath, fs.constants.R_OK)
            fileAccess.R = true
        } catch (error) {
            console.log(`${filePath} 无法读取`);
            console.log(error);
            fileAccess.R = false
        }

    } catch {
        
    }

    return fileAccess
    
}

function copyFolder(source, target) {
    let fileList = fs.readdirSync(source)
    try {
        fileList.forEach((file)=>{
            let sourceFile = path.join(source, file)
            let targetFile = path.join(target, file)
            if( fs.statSync(sourceFile).isDirectory() ){
                copyFolder(sourceFile,targetFile)
            } else {
                fs.copyFile(sourceFile, targetFile, (err) => {
                    if(err){
                        console.log(file + "：拷贝错误");
                    } else {
                        console.log(file + "：拷贝成功");
                        let type = file.split('.')[1]
                        fs.renameSync(targetFile, path.join(target, `${TargetName}.${type}`))
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}