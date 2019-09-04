import fs from 'fs';
import path from 'path';
import {expect} from 'chai';
import {GetTemplates, UpdateTemplates, ResetTemplates} from '../src/config/template';


describe('template配置文件测试', () => {
    after(() => {
        ResetTemplates();
    })
    it('GetTemplate()方法可以获取到template配置', () => {
        const templates = GetTemplates();
        expect(templates).to.be.an('array');
        templates.forEach(t => {
            expect(t).to.have.property('templateName');
            expect(t).to.have.property('remoteAddress');
        })
    });
    it('UpdateTemplates()方法可以更新template配置', () => {
        const newTemplateJson = [{
            templateName: 'ee',
            remoteAddress: 'dd'
        }]
        UpdateTemplates(newTemplateJson);
        const templates = GetTemplates();
        expect(templates).to.deep.equal(newTemplateJson);
    })
    it('ResetTemplates()方法可以重置template配置', () => {
        ResetTemplates();
        const templates = GetTemplates();
        const buffer = fs.readFileSync(path.resolve(__dirname, '../assets/template.json.bak'));
        expect(templates).to.deep.equal(JSON.parse(buffer.toString()))
    })
})