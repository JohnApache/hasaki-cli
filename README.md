
> 目前只是实现了脚手架的功能，模版还没有添加完整，下载的模版项目暂时只是测试用例, 还不能初始化正确的内置模版项目，后续会陆续添加 完整的模版项目。 

# hasaki-cli
自动化构建react, vue, jquery, js类库, koa/express/egg项目, node-plugin, typescript 等等多种项目结构初始化

### 安装方法

```shell
npm install @dking/hasaki-cli -g
```

### hasaki-cli init 命令介绍
该命令通过展示默认模版列表 快速创建指定类型 的模板项目
+ **init** 内部的执行步骤:
    1. 存储终端传入的 projectName, 后面作为存储远端模版的目录名称.
    2. 终端展示 template 模版列表 prompt，用户可以通过终端交互方式选择 需要使用的模版.
    3. 拉取指定模版的远端代码存储到临时目录中，等待后续文件处理, clone 方式为浅克隆，并可以通过 “#” 跟随repo 地址 来指定分支.
    4. hasaki-cli 会读取临时目录里模版配置文件， 配置文件默认名称为 .hasakirc.js, 并解析出来 读取文件的配置内容
    5. 读取 配置文件 的 question 配置，终端展示 对应的 prompt 交互，选择的结果将作为后续的动态渲染的变量
    6. 读取 ignore, parseExclude, parseInclude 等配置传入 piper 方法，对源文件经过不同的处理输出到 指定目录。

+ 基本使用方法
```shell
hasaki-cli init <projectName>
```

+ 可选配置 flag
    - **-d, --out-dir <dirname>** 指定 **hasaki-cli** 
    输出目录 dirname， 如果不指定默认为当前目录 ".", 具体使用方法如下
    ```shell
    hasaki-cli init <projectName> -d packageA
    ```

    - **--ignore <pattern,...,parttern>** 指定 **hasaki-cli** 
    需要忽略的文件, pattern 字符串 内部会处理成 正则匹配文件和目录, 多个parttern以 “,” 作为连接符, 匹配的文件 将会被过滤，不会输出到目标目录, 具体使用方法如下
    ```shell
    hasaki-cli init <projectName> --ignore lib,dist
    ```

    - **--include <pattern,...,parttern>** 指定 **hasaki-cli** 需要经过 ejs 动态渲染内容的文件匹配, cli 默认会处理 .js 和 .json 为后缀的所有文件. 这些文件如果包含 ejs 语法，会被动态编译后再输出到指定目录, 如果还需额外编译其他文件可以通过使用--include可选配置， include 的参数 parttern 同ignore 一样内部 也会被当成正则匹配处理, 多个parttern以 “,” 作为连接符, 使用方法如下.
    ```shell
    hasaki-cli init <projectName> --include packageA,packageB
    ```

    - **--exclude <pattern,...,parttern>** 某些情况，我们可能并不希望 **hasaki-cli** 去处理动态渲染某些文件，可以指定 **hasaki-cli** 需要排除动态渲染内容的文件匹配， 被排除的文件会直接全量复制到指定目录，--exclude 传入的参数 pattern 会被当成正则匹配处理, 多个parttern以 “,” 作为连接符,使用方法如下.
     ```shell
    hasaki-cli init <projectName> --exclude view,src/ejs
    ```

    - **-c, --config <configName>** 指定 **hasaki-cli** 需要读取的远端模版配置文件名称， 默认为 ".hasakirc.js", 也可以通过该选项指定其他 目录的文件, 其他文件必须是 commonjs格式，将配置导出。
    ```shell
    hasaki-cli init <projectName> -c config/.hasaki.config.js
    ```

### hasaki-cli install 命令介绍
该命令允许用户，不使用模版列表的选项, 直接下载远端模版代码, 并输出结果
+ **install** 内部的执行步骤: (内部实现调用的init 方法，所以流程差不多)
    1. 存储终端传入的 remoteAddress, 后面作为下载远端模版的地址.
    2. 终端展示 projectName 项目名称 prompt，用户可以通过终端传入当前 projectName 后面作为存储远端模版的目录名称. 后面的流程和 init 一致.
    3. 拉取指定模版的远端代码存储到临时目录中，等待后续文件处理, clone 方式为浅克隆，并可以通过 “#” 跟随repo 地址 来指定分支.
    4. hasaki-cli 会读取临时目录里模版配置文件， 配置文件默认名称为 .hasakirc.js, 并解析出来 读取文件的配置内容
    5. 读取 配置文件 的 question 配置，终端展示 对应的 prompt 交互，选择的结果将作为后续的动态渲染的变量
    6. 读取 ignore, parseExclude, parseInclude 等配置传入 piper 方法，对源文件经过不同的处理输出到 指定目录。

+ 基本使用方法
```shell
hasaki-cli install <remoteAddress>
```
+ 可选配置 flag
因为 该命令内部实现处理使用的init 命令内部实现处理，所以可选配置参数同 init 完全一致

### hasaki-cli template 命令介绍
**hasaki-cli**内部提供了常用的模版列表选项，该命令允许用户自定义模版列表

+ 可选配置 flag
    - **--list** 展示当前的所有模版列表信息，使用方法如下
    ```shell
    hasaki-cli template --list
    ```
    - **--add** 添加一个模版至模版列表顶部，该配置会在终端展示添加 模版的 prompt， 并将用户最后的结果保存在模版列表中，使用方法如下
     ```shell
    hasaki-cli template --add
    ```
    - **--delete** 从模版列表中删除指定的多个模版，该配置会在终端展示checkbox 风格的 prompt，将用户选中的所有模版 删除，使用方法如下
    ```shell
    hasaki-cli template --delete
    ```
    - **--update** 指定模版列表中的某一项，该配置会在终端展示list 风格的 prompt，用户选中的模版 最终将用户输入的内容更新到当前目录，使用方法如下
    ```shell
    hasaki-cli template --update
    ```
    - **--clear** 清除模版列表所有选项内容，使用方法如下
    ```shell
    hasaki-cli template --clear
    ```
    - **--reset** 重置模版列表所有选项内容，**hasaki-cli** 内部有一个备份文件，当使用该选项的时候会将模版列表文件重置当初始状态，使用方法如下
    ```shell
    hasaki-cli template --reset
    ```
> 注意事项: template 命令支持 模版列表的增删改查，但是只允许同时存在一个 选项配置, 否则会抛出异常
