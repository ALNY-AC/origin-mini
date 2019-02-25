const gulp = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const sass = require('gulp-sass');

module.exports = class Watch {
    constructor() {
        this.tempSrc = path.join(process.cwd(), 'model/page.ts.temp');//取ts文件模板的路径
    }
    run() {
        gulp.watch('pages/**/*.js', (event) => {
            let filePath = event.path;
            let type = event.type;
            console.warn(`[${type}]：${filePath}`);
            if (type == 'added') {
                if (filePath.indexOf('.js') > 0) {
                    console.warn('js');
                    this.addFile(filePath);
                }
            }
            // if (type == "changed") {
            // }
        });
        // this.watchScss();
    }
    watchScss() {
        // sass

        gulp.watch('pages/**/*.scss', function (event) {
            let filePath = event.filePath;
            let paths = filePath.split("\\");//路径切割
            let folderPath = paths.slice(0, paths.length - 1).join('\\');//取文件所在的文件夹

            gulp.src(filePath) // Gets all files ending with .scss in app/scss and children dirs
                .pipe(sass({ outputStyle: 'compressed' }))
                .pipe(gulp.dest(folderPath))
        });
    }
    /**
     * 根据js文件创建一个ts文件
     * @param filePath 文件路径
     */
    async addFile(filePath) {
        let paths = filePath.split("\\");//路径切割
        let folderPath = paths.slice(0, paths.length - 1).join('\\');//取文件所在的文件夹
        let pageName = paths[paths.length - 1].split('.')[0];//取文件的名字
        let pageNameUp = pageName.substring(0, 1).toUpperCase() + pageName.substring(1);//去首字母大写的文件名
        let tempContent = await fs.readFile(this.tempSrc, 'utf8');//取ts文件模板的内容
        let importHead = this.getImport(`${folderPath}`);//获取导入模块的层级
        tempContent = tempContent.replace(/{{ NAME }}/g, pageNameUp);//替换ts文件模板的常量为当前的文件名
        tempContent = tempContent.replace(/{{ OFFSET }}/g, importHead);// 替换导入的目录
        // 创建一个ts文件
        this.addTsFile(`${folderPath}/${pageName}.ts`, tempContent);
        this.addScssFile(`${folderPath}/${pageName}.scss`, '');
    }
    addScssFile(src, content) {
        fs.outputFile(src, content);
    }
    addTsFile(src, content) {
        fs.outputFile(src, content);
    }
    getImport(fileSrc) {
        let offset = fileSrc.split('\\').length - process.cwd().split('\\').length;
        let offsetStr = '';
        for (let i = 1; i <= offset; i++) {
            offsetStr += '../'
        }
        return offsetStr
    }
}