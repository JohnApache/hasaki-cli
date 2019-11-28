> 目前模版项目尚未开发完毕，后续会陆续添加。 

# hasaki-cli 

<!-- [![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/:packageName.svg?style=flat-square
[npm-url]: https://npmjs.org/package/:packageName
[travis-image]: https://www.travis-ci.org/JohnApache/:packageName.svg
[travis-url]: https://travis-ci.org/JohnApache/:packageName
[codecov-image]: https://codecov.io/gh/JohnApache/:packageName/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/JohnApache/:packageName
[snyk-image]: https://snyk.io/test/github/JohnApache/:packageName/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/JohnApache/:packageName?targetFile=package.json
[download-image]: https://img.shields.io/npm/dm/:packageName.svg?style=flat-square
[download-url]: https://npmjs.org/package/:packageName -->

- [English](README.en_US.md)
- [简体中文](README.md)

> 可以自动化构建React, Vue, Jquery, Js类库, Koa/Express/Egg项目, Plugin等等多种项目结构初始化，还可以为已存在项目生成可直接使用的单个或多个插件配置.

- [安装](#安装)
- [基本使用](#基本使用)
- [命令介绍](#命令介绍)
- [.hasakirc.js配置文件规则](#.hasakirc.js配置文件规则)
- [注意](#注意)
- [建议](#建议)
- [License](#license)

## 安装
```bash
$ npm i @dking/hasaki-cli -g 
```

## 基本使用

```bash
$ hasaki-cli init -d ./react-demo

$ hasaki-cli install https://github.com/JohnApache/hasaki-template/tree/master/react -d ./react-demo

$ hasaki-cli gen readme,eslint,babel,webpack --installed react

$ hasaki-cli template --list
```

## 命令介绍
+ **init | i <projectName>** 通过选择一个适合的模版来快速初始化项目, 可选配置如下
    - **-d, --out-dir <dirname>**           指定输出目录，默认为当前执行环境目录.
    - **--ignore <pattern,...,parttern>**   指定需要忽略的文件.
    - **--exclude <pattern,...,parttern>**  指定不需要ejs渲染的文件.
    - **--include <pattern,...,parttern>**  指定需要用ejs渲染的文件，一般配合exclude使用.
    - **-c, --config <configName>**         指定需要读取的模版项目配置文件名称, 默认为 **.hasakirc.js**.
    - **-h, --help**                        输出帮助文档
    ```bash
    $ hasaki-cli init -d ./react-demo
    ```

+ **install <remoteAddress>** 和init效果相仿，用远端地址来代替内置模版选项, 可选配置如下
    - **-d, --out-dir <dirname>**           指定输出目录，默认为当前执行环境目录.
    - **--ignore <pattern,...,parttern>**   指定需要忽略的文件.
    - **--exclude <pattern,...,parttern>**  指定不需要ejs渲染的文件.
    - **--include <pattern,...,parttern>**  指定需要用ejs渲染的文件，一般配合exclude使用.
    - **-c, --config <configName>**         指定需要读取的模版项目配置文件名称, 默认为 **.hasakirc.js**.
    - **-h, --help**                        输出帮助文档    
    ```bash
    $ hasaki-cli init -d ./react-demo
    ```

 + **template | t** 默认内置模版列表CRUD的命令，用于自定义模版列表，可选配置如下
    - **--list**            展示当前模版列表.
    - **--add**             添加模版.
    - **--update**          更新模版.
    - **--delete**          删除模版.
    - **--clear**           清空模版.
    - **--reset**           重置模版.
    - **-h, --help**        输出帮助文档    
    ```bash
    $ hasaki-cli template --list

    $ hasaki-cli template --add

    $ hasaki-cli template --reset
    ```

 + **gen | generate [plugin,...,plugin]** 为已存在的项目快速添加插件所需要的配置文件或其他相关文件
    - **-d, --out-dir <dirname>**               指定输出目录，默认为当前目录.
    - **--installed  <plugin,...,plugin>**      指定当前项目已经安装的插件环境.
    - **-f, --force-cover**                     强制覆盖文件.
    - **-h, --help**                            输出帮助文档   

    > 支持的插件配置列表如下: readme, eslint, mocha, jest, babel, webpack, rollup, gulp, lerna, typescript.

    > 额外可配置已安装配置: react, vue....

    ```bash
    $ hasaki-cli gen eslint,readme,mocha,babel,rollup,typepscript -d ./config --installed react
    ```

## **.hasakirc.js配置文件**
> **.hasakirc.js** 文件是存在于模版项目根目录的配置文件，**hasaki-cli** 会尝试动态读取加载该文件，并按照该配置文件加载过滤筛选文件，并按照 [ejs](https://ejs.bootcss.com/) 规则读取文件，如果没有该文件则不会按照任何规则，全输出目标文件，这样的配置文件让 **hasaki-cli** 拥有可以定制模版项目的能力，可以让用户自己定制模版项目不同情况的不同输出，适用于任何 GitHub 项目, 非常灵活.

```js
// .hasakirc.js
module.exports = {
    parseExclude: [],
    parseInclude: [],
    ignore: [],
    question: [{
        type: 'confirm',
        message: 'use ts?',
        name: 'useTs',
        default: true
    }],
    screener(answers) {
        const { useTs } = answers;
        const include = [];
        const exclude = [];
    
        if(useTs) {
            exclude.push({
                path: './src/index.js'
            })
        }else {
            exclude.push({
                path: './src/index.ts'
            }, {
                path: './tsconfig.json'
            })
        }
        return { include, exclude }
    }
}
```

+ **parseExclude** 
    - 参数含义: 指定不需要ejs过滤的文件，防止项目中原本就存在 ejs 模版文件
    - 参数类型: Array<Rule | RegExp> 

+ **parseInclude** 
    - 参数含义: 指定需要ejs过滤的文件，配合 **parseExclude** 配置一起使用
    - 参数类型: Array<Rule | RegExp>    

+ **ignore**  
    - 参数含义: 指定需要忽略的文件
    - 参数类型: Array<Rule | RegExp>    

+ **question**  
    - 参数含义: 指定需要使用的 [inquirer](https://www.npmjs.com/package/inquirer) 的交互问题
    - 参数类型: Array<Question> 具体配置参见 [inquirer](https://www.npmjs.com/package/inquirer).

+ **screener**  
    - 参数含义: 筛选器, 该参数是一个函数，它接收了 question 的 answer 作为参数，返回 {exclude: Array<Rule | RegExp>, include: Array<Rule | RegExp>}, 可以根据不同的 answer, 返回不同的结果来筛选文件。
    - 参数类型: Function(answer: Answer): {

            exclude: Array<Rule | RegExp>; // 需要排除的文件

            include: Array<Rule | RegExp>; // 需要包含的文件，配合 exclude 一起使用

        }; 

## 注意
1. 多项选择默认以 "," 分割多个选项
2. **pattern** 表示目标项目的相对路径 正则或Rule, Rule 为 { path?: string; match?: RegExp; }对象, path 为文件相对路径，match为正则匹配， path 和 match 只需要一个即可
3. 远端模版配置文件 **.hasakirc.js** 文件必须通过 commonjs 格式导出配置
4. 配置 **.hasakirc.js** 文件编写 **question** 规则必须和 [inquirer](https://www.npmjs.com/package/inquirer) 规则相同, 否则会解析错误

## 建议
欢迎创建issue 或者 pr [here](https://github.com/JohnApache/hasaki-cli/issues).

## License

[MIT](LICENSE)
