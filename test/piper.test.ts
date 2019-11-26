import fs from 'fs';
import path from 'path';
import {expect} from 'chai';
import {FileCleanner, FilePiper} from '../src/piper';
import {MakeDirs} from '../src/piper/utils';
import Analyse from '../src/piper/analyse';

describe('piper文件中转功能单元测试', () => {
    describe('FileCleanner()清除文件方法测试', () => {
        let tmpDir = '', tmp1 = '', tmp2 = ''
        beforeEach(() => {
            tmpDir = path.resolve(__dirname, './tmp');
            tmp1 = path.resolve(__dirname, './tmp/tmp1.js');
            tmp2 = path.resolve(__dirname, './tmp/tmp2.js');
            if(!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }
            if(!fs.existsSync(tmp1)) {
                fs.writeFileSync(tmp1, '测试文件1');
            }
            if(!fs.existsSync(tmp2)) {
                fs.writeFileSync(tmp2, '测试文件2');
            }
        })

        after(() => {
            if(fs.existsSync(tmpDir)) {
                if(fs.existsSync(tmp1)) {
                    fs.unlinkSync(tmp1);
                }
                if(fs.existsSync(tmp2)) {
                    fs.unlinkSync(tmp2);
                }
                fs.rmdirSync(tmpDir)
            }
        })

        it('FileCleanner()方法返回值是一个promise', () => {
            expect(FileCleanner(tmp1)).to.be.a('promise');
        });

        it('FileCleanner()可以删除某单个文件', async () => {
            await FileCleanner(tmp1);
            expect(fs.existsSync(tmp1)).to.be.not.ok;
        });

        it('FileCleanner()可以同时删除多个文件', async () => {
            await FileCleanner(tmp1, tmp2);
            expect(fs.existsSync(tmp1)).to.be.not.ok;
            expect(fs.existsSync(tmp2)).to.be.not.ok;
        });

        it('FileCleanner()可以同时删除整个目录', async () => {
            await FileCleanner(tmpDir);
            expect(fs.existsSync(tmpDir)).to.be.not.ok;
        });
    })

    describe('FilePiper()文件处理转移测试', () => {
        let tmpDir: string, tmp1: string, tmp2: string, tmp3: string, tmp4: string, tmpCSSDir: string, targetDir: string;
        before(() => {
            targetDir = path.resolve(__dirname, './target');
            tmpDir = path.resolve(__dirname, './tmp');
            tmpCSSDir = path.resolve(__dirname, './tmp/css');
            tmp1 = path.resolve(__dirname, './tmp/tmp1.text');
            tmp2 = path.resolve(__dirname, './tmp/tmp2.js');
            tmp3 = path.resolve(__dirname, './tmp/tmp3.json');
            tmp4 = path.resolve(__dirname, './tmp/css/tmp4.css');
            if(!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }
            if(!fs.existsSync(tmpCSSDir)) {
                fs.mkdirSync(tmpCSSDir);
            }
            if(!fs.existsSync(tmp1)) {
                fs.writeFileSync(tmp1, '测试文本<%= locals.author%>');
            }
            if(!fs.existsSync(tmp2)) {
                fs.writeFileSync(tmp2, `<% if(locals.author) { %>const ddd = "<%= locals.author %>";<% } %>`);
            }
            if(!fs.existsSync(tmp3)) {
                fs.writeFileSync(tmp3, `{"name":"<%= locals.author%>"}`);
            }
            if(!fs.existsSync(tmp4)) {
                fs.writeFileSync(tmp4, '.css{background:<%= locals.author%>}');
            }
        });

        beforeEach(async () => {
            if(fs.existsSync(targetDir)) {
                await FileCleanner(targetDir)
            }
        })
        
        after(async () => {
            if(fs.existsSync(tmpDir)) {
                await FileCleanner(tmpDir);
                await FileCleanner(targetDir);
            }
        })

        it('FilePiper()方法可以递归复制目录里的所有文件到指定目录', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
            });
            expect(fs.existsSync(targetDir)).to.be.ok;
            expect(fs.existsSync(tmp1.replace(tmpDir, targetDir))).to.be.ok;
            expect(fs.existsSync(tmp2.replace(tmpDir, targetDir))).to.be.ok;
            expect(fs.existsSync(tmp3.replace(tmpDir, targetDir))).to.be.ok;
            expect(fs.existsSync(tmpCSSDir.replace(tmpDir, targetDir))).to.be.ok;
            expect(fs.existsSync(tmp4.replace(tmpDir, targetDir))).to.be.ok;
        });

        it('FilePiper()方法可以传入parseData动态渲染不同内容', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
            });
            expect(fs.readFileSync(tmp2.replace(tmpDir, targetDir)).toString() === 'const ddd = "000"');
        });

        it('FilePiper()方法可以传入ignore过滤不需要的文件', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
                ignore: [
                    /tmp3/
                ]
            });
            expect(fs.existsSync(tmp2.replace(tmpDir, targetDir))).to.be.ok;
            expect(fs.existsSync(tmp3.replace(tmpDir, targetDir))).to.be.not.ok;
        });

        it('FilePiper()方法动态渲染内容，默认只包含.js .json文件', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
            });
            expect(fs.readFileSync(tmp1.replace(tmpDir, targetDir)).toString() === '测试文本<%= locals.author%>');
            expect(fs.readFileSync(tmp2.replace(tmpDir, targetDir)).toString() === 'const ddd = "000"');
            expect(fs.readFileSync(tmp3.replace(tmpDir, targetDir)).toString() === '{"name":"000"}');
            expect(fs.readFileSync(tmp4.replace(tmpDir, targetDir)).toString() === '.css{background:<%= locals.author%>}');
        });

        it('FilePiper()方法可以配置parseInclude 额外添加需要动态渲染的文件，exlcude 排除指定不需要的动态渲染的文件', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
                parseInclude: [
                    /^.+\.text/,
                    /^.+\.css/,
                ],
                parseExclude: [
                    /tmp3.json$/
                ]
            });
            
            expect(fs.readFileSync(tmp1.replace(tmpDir, targetDir)).toString() === '测试文本000');
            expect(fs.readFileSync(tmp2.replace(tmpDir, targetDir)).toString() === 'const ddd = "000"');
            expect(fs.readFileSync(tmp3.replace(tmpDir, targetDir)).toString() === '{"name":"<%= author%>"}');
            expect(fs.readFileSync(tmp4.replace(tmpDir, targetDir)).toString() === '.css{background:000}');
        });

        it('FilePiper()方法可以配置parseInclude exlcude 短路径匹配模式具有同样的效果', async () => {
            await FilePiper(tmpDir, targetDir, {
                parseData: {
                    author: '000'
                },
                parseInclude: [
                    {
                        path: './tmp/tmp1.text'
                    },
                    {
                        path: './tmp/css'
                    }
                ],
                parseExclude: [
                    {
                        path: './tmp/tmp3.json'
                    }
                ]
            });
            expect(fs.readFileSync(tmp1.replace(tmpDir, targetDir)).toString() === '测试文本000');
            expect(fs.readFileSync(tmp2.replace(tmpDir, targetDir)).toString() === 'const ddd = "000"');
            expect(fs.readFileSync(tmp3.replace(tmpDir, targetDir)).toString() === '{"name":"<%= author%>"}');
            expect(fs.readFileSync(tmp4.replace(tmpDir, targetDir)).toString() === '.css{background:000}');
        });
    })

    describe('Analyse()分析配置文件方法测试', () => {
        let tmpDir: string, tmp: string, otherDir: string, otherTmp: string, otherTmp2: string;
        before(() => {
            tmpDir = path.resolve(__dirname, './tmp');
            otherDir = path.resolve(__dirname, './other');
            tmp = path.resolve(__dirname, './tmp/.hasakirc.js');
            otherTmp = path.resolve(__dirname, './other/.ccc.js');
            otherTmp2 = path.resolve(__dirname, './other/.ggg.js');
            if(!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }
            if(!fs.existsSync(otherDir)) {
                fs.mkdirSync(otherDir);
            }
            if(!fs.existsSync(tmp)) {
                fs.writeFileSync(tmp, `
                    module.exports = {
                        parseExclude: [
                            /\\d/,
                        ],
                        parseInclude: [
                            /\\w/,
                        ],
                        ignore: [
                            /\\s/,
                        ],
                        question: [
                            {
                                type: 'input',
                                message: '请输入作者名称',
                                name: 'author',
                                filter(input) {
                                    return input || '';
                                },
                                validate(input) {
                                    return input && input.length > 0;
                                }
                            },
                        ]
                    }
                `)
            }
            if(!fs.existsSync(otherTmp)) {
                fs.writeFileSync(otherTmp, `
                    module.exports = {
                        parseExclude: [
                            /\\d/,
                        ],
                        parseInclude: [
                            /\\w/,
                        ],
                        ignore: [
                            /\\s/,
                        ],
                        question: [
                            {
                                type: 'input',
                                message: '请输入作者名称',
                                name: 'author',
                                filter(input) {
                                    return input || '';
                                },
                                validate(input) {
                                    return input && input.length > 0;
                                }
                            },
                        ]
                    }
                `)
            }
        });

        after(() => {
            if(fs.existsSync(tmpDir)) {
                if(fs.existsSync(tmp)) {
                    fs.unlinkSync(tmp);
                }
                fs.rmdirSync(tmpDir);
            }
            if(fs.existsSync(otherDir)) {
                if(fs.existsSync(otherTmp)) {
                    fs.unlinkSync(otherTmp);
                }
                if(fs.existsSync(otherTmp2)) {
                    fs.unlinkSync(otherTmp2);
                }
                fs.rmdirSync(otherDir);
            }
        })

        it('Analyse()方法可以读取指定任意目录位置下的配置文件', () => {
            const analyseResult1 = Analyse(tmp);
            const analyseResult2 = Analyse(otherTmp);
            expect(analyseResult1).to.be.a('object');
            expect(analyseResult2).to.be.a('object');
        });

        it('Analyse()方法读取的配置包含文件中转传输的必要字段', () => {
            const analyseResult = Analyse(tmp);
            expect(analyseResult).to.have.property('parseExclude').with.deep.equal([/\d/]);
            expect(analyseResult).to.have.property('parseInclude').with.deep.equal([/\w/]);
            expect(analyseResult).to.have.property('ignore').with.deep.equal([/\s/]);
            expect(analyseResult).to.have.property('question').with.lengthOf(1);
        });

        it('Analyse()方法读取不包含配置文件的目录时返回空对象', () => {
            const analyseResult = Analyse(otherTmp2);
            expect(analyseResult).to.deep.equal({});
        });
    })

    describe('Utils 方法测试', () => {
        const tmp = path.resolve(__dirname, './a')
        const dir = path.resolve(tmp, './b/c');

        before(async () => {
            if(fs.existsSync(tmp)) {
                await FileCleanner(path.resolve(__dirname, './a'))
            }
        })

        after(async () => {
            if(fs.existsSync(tmp)) {
                await FileCleanner(path.resolve(__dirname, './a'))
            }
        })

        it('MakeDirs() 可以创建多级目录', () => {
            MakeDirs(dir);
            expect(fs.existsSync(dir)).to.be.ok;
            expect(fs.statSync(dir).isDirectory()).to.be.ok;
        })
    })
})
