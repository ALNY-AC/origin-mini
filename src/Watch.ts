import gulp from 'gulp'
import path from 'path';
import fs from 'fs-extra';
const sass = require('gulp-sass');
export class Watch {
    tempSrc: string = path.join(process.cwd(), 'model/page.ts.temp');//取ts文件模板的路径
    constructor() { }
    run() {
        gulp.watch('pages/**/*.js', (event: any) => {
            let { path, type } = event;
            if (type == 'added') {
                if (path.indexOf('.js') > 0) {
                    console.warn('js');
                    this.addFile(path);
                }
            }
            // if (type == "changed") {
            // }
        });
        // this.watchScss();
    }
    private watchScss() {
        // sass

        gulp.watch('pages/**/*.scss', function (event: any) {
            let { path } = event;
            let paths = path.split("\\");//路径切割
            let folderPath = paths.slice(0, paths.length - 1).join('\\');//取文件所在的文件夹

            gulp.src(path) // Gets all files ending with .scss in app/scss and children dirs
                .pipe(sass({ outputStyle: 'compressed' }))
                .pipe(gulp.dest(folderPath))
            console.warn(path);
        });
    }
    /**
     * 根据js文件创建一个ts文件
     * @param filePath 文件路径
     */
    private async addFile(filePath: string) {
        let paths = filePath.split("\\");//路径切割
        let folderPath = paths.slice(0, paths.length - 1).join('\\');//取文件所在的文件夹
        let pageName = paths[paths.length - 1].split('.')[0];//取文件的名字
        let pageNameUp = pageName.substring(0, 1).toUpperCase() + pageName.substring(1);//去首字母大写的文件名
        let tempContent = await this.getTempContent();//取ts文件模板的内容
        let importHead = this.getImport(`${folderPath}`);//获取导入模块的层级
        tempContent = tempContent.replace(/{{ NAME }}/g, pageNameUp);//替换ts文件模板的常量为当前的文件名
        tempContent = tempContent.replace(/{{ OFFSET }}/g, importHead);// 替换导入的目录
        // 创建一个ts文件
        this.addTsFile(`${folderPath}/${pageName}.ts`, tempContent);
        this.addScssFile(`${folderPath}/${pageName}.scss`, '');
    }
    private addScssFile(src: string, content: string) {
        fs.outputFile(src, content);
    }
    private addTsFile(src: string, content: string): void {
        fs.outputFile(src, content);
    }
    getImport(fileSrc: string): string {
        let offset = fileSrc.split('\\').length - process.cwd().split('\\').length;
        let offsetStr = '';
        for (let i = 1; i <= offset; i++) {
            offsetStr += '../'
        }
        return offsetStr
    }
    private async getTempContent() {
        return await fs.readFile(this.tempSrc, 'utf8');//取ts文件模板的内容
    }
}