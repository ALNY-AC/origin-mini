import { Watch } from './Watch';
import program from 'commander';

program
    .option('-w, --watch [lang]', '监听文件，当小程序新建一个page，就会自动创建一个ts文件')
program.parse(process.argv);
if (program.watch) {

    let watch = new Watch();
    watch.run();

}