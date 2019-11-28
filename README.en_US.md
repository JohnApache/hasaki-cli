> At present, the template project has not been fully developed, and will be added in succession。 

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

> It can automatically build React, Vue, jQuery, JS library, Koa / Express / Egg project, Plugin and other project structure initialization. It can also generate single or multiple plug-in configurations that can be used directly for existing projects.

- [Install](#install)
- [Usage](#usage)
- [CommandIntroduction](#commandIntroduction)
- [.hasakirc.js](#.hasakirc.js)
- [Tips](#tips)
- [Questions](#questions)
- [License](#license)

## Install
```bash
$ npm i @dking/hasaki-cli -g 
```

## Usage

```bash
$ hasaki-cli init -d ./react-demo

$ hasaki-cli install https://github.com/JohnApache/hasaki-template/tree/master/react -d ./react-demo

$ hasaki-cli gen readme,eslint,babel,webpack --installed react

$ hasaki-cli template --list
```

## CommandIntroduction
+ **init | i <projectName>** Quickly initialize the project by selecting a suitable template. The optional configuration is as follows
    - **-d, --out-dir <dirname>**           Specifies the output directory, which is the current execution environment directory by default.
    - **--ignore <pattern,...,parttern>**   Specify files to ignore.
    - **--exclude <pattern,...,parttern>**  Specify files that do not require EJS rendering.
    - **--include <pattern,...,parttern>**  Specifies the files that need to be rendered with EJS, generally used in conjunction with exclude.
    - **-c, --config <configName>**         Specify the template project configuration file name to read, Default: **.hasakirc.js**.
    - **-h, --help**                        Output help documents
    ```bash
    $ hasaki-cli init -d ./react-demo
    ```

+ **install <remoteAddress>** It has the same effect as "init". The remote address is used instead of the built-in template option. The optional configuration is as follows
    - **-d, --out-dir <dirname>**           Specifies the output directory, which is the current execution environment directory by default.
    - **--ignore <pattern,...,parttern>**   Specify files to ignore.
    - **--exclude <pattern,...,parttern>**  Specify files that do not require EJS rendering.
    - **--include <pattern,...,parttern>**  Specifies the files that need to be rendered with EJS, generally used in conjunction with exclude.
    - **-c, --config <configName>**         Specify the template project configuration file name to read, Default: **.hasakirc.js**.
    - **-h, --help**                        Output help documents    
    ```bash
    $ hasaki-cli init -d ./react-demo
    ```

 + **template | t** The command is used to customize the template list with CRUD. The optional configurations are as follows
    - **--list**            Show current template list.
    - **--add**             Add template.
    - **--update**          Update template.
    - **--delete**          Delete template.
    - **--clear**           Clear template.
    - **--reset**           Reset template.
    - **-h, --help**        Output help documents    
    ```bash
    $ hasaki-cli template --list

    $ hasaki-cli template --add

    $ hasaki-cli template --reset
    ```

 + **gen | generate [plugin,...,plugin]** Quickly add configuration files or other related files for existing projects
    - **-d, --out-dir <dirname>**               Specify output directory, default to current directory.
    - **--installed  <plugin,...,plugin>**      Specify the plug-in environment that the current project has installed.
    - **-f, --force-cover**                     Force overwrite file.
    - **-h, --help**                            Output help documents   

    > The list of supported plug-in configurations is as follows: readme, eslint, mocha, jest, babel, webpack, rollup, gulp, lerna, typescript.

    > Additional configurable installed configuration: react, vue....

    ```bash
    $ hasaki-cli gen eslint,readme,mocha,babel,rollup,typepscript -d ./config --installed react
    ```

## .hasakirc.js
> **.hasakirc.js** file is a configuration file that exists in the root directory of the template project, **hasaki-cli** will attempt to dynamically read and load the file. And load the filter file according to the configuration file, read files according to [ejs](https://ejs.bootcss.com/) rules, If there is no such file, the target project will be output in full,Such a configuration file gives **hasaki-cli** the ability to customize template projects, allows users to customize template projects, output different contents in different situations, and it is applicable to any GitHub project, very flexible!.

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
    - Meaning: Specify files that do not require EJS rendering, Prevent EJS template file in the project.
    - Type: Array<Rule | RegExp> 

+ **parseInclude** 
    - Meaning: Specify files that require EJS rendering,Use with **parseExclude**.
    - Type: Array<Rule | RegExp>    

+ **ignore**  
    - Meaning: Specify files to ignore
    - Type: Array<Rule | RegExp>    

+ **question**  
    - Meaning: Specify the interaction problem of [inquirer] (https://www.npmjs.com/package/inquirer) to be used
    - Type: Array<Question> For specific configuration, see [inquirer](https://www.npmjs.com/package/inquirer).

+ **screener**  
    - Meaning: Screener is a function, it takes "answer" of "question" as a parameter, return type is {exclude: Array<Rule | RegExp>, include: Array<Rule | RegExp>}, you can filter files according to different "answers".
    - Type: Function(answer: Answer): {

            exclude: Array<Rule | RegExp>; // Specify files to exclude

            include: Array<Rule | RegExp>; // Specifies the files to be included for use with "exclude"

        }; 

## TIPS
1. Multiple choices split multiple options with "," by default
2. **pattern** can be a relative path  of the target project or a RegExp, or a Rule, Rule is a object like this { path?: string; match?: RegExp; }, path is a relative path, match is RegExp, path and match only need one
3. The **.hasakirc.js** file must be exported in commonjs.
4. **.hasakirc.js** write **question** must same rules as [inquirer](https://www.npmjs.com/package/inquirer) Question. Otherwise, it will parse the error

## Questions
Please open an issue [here](https://github.com/JohnApache/hasaki-cli/issues).

## License

[MIT](LICENSE)
