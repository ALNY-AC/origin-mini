import gulp from 'gulp'
import path from 'path';
import fs from 'fs-extra';

export class Watch {
    tempSrc: string = process.cwd() + '\\model\\page.ts.temp';//取ts文件模板的路径
    constructor() { }
    run() {
        gulp.watch('js/**/*.js', (event: any) => {
            let { path, type } = event;
            if (type == "changed") {
                this.addFile(path);
            }
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
        tempContent = tempContent.replace(/{{ NAME }}/g, pageNameUp);//替换ts文件模板的常量为当前的文件名
        // console.warn(tempContent);
        this.autuImport();
        // 创建一个ts文件
        // fs.outputFile(`${originPath}/${fileName}.ts`, `ts : ${fileName}.ts`);
    }
    autuImport() {
        let originSrc = path.join(__dirname, 'utils/origin/Origin');
        console.warn(__dirname);
        console.warn(originSrc);
    }
    private async getTempContent() {
        return await fs.readFile(this.tempSrc, 'utf8');//取ts文件模板的内容
    }
}