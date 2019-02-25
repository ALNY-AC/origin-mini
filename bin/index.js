"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Watch_1 = require("./Watch");
const commander_1 = __importDefault(require("commander"));
commander_1.default
    .option('-w, --watch [lang]', '监听文件，当小程序新建一个page，就会自动创建一个ts文件');
commander_1.default.parse(process.argv);
if (commander_1.default.watch) {
    let watch = new Watch_1.Watch();
    watch.run();
}
