import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

/**
 * require.context函数接受三个参数
 * 语法: require.context(directory, useSubdirectories = false, regExp = /^.//);
 * 1.directory {String} -读取文件的路径
 * 2.useSubdirectories {Boolean} -是否遍历文件的子目录
 * 3.regExp {RegExp} -匹配文件的正则
 * 
 * 返回的是一个函数，并且这个函数有3个属性
 * 1.resolve {Function}
 * 2.keys {Function} -返回匹配成功模块的名字组成的数组
 * 3.id {String}
 */
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules",true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules,modulePath)=>{
    //set './app.js'=>'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
},{})

const store = new Vuex.Store({
    modules
})
export default store