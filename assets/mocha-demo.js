import {expect} from 'chai';

<%_ if(locals.typescript){ _%>
const add = (...nums: number[]): number => {
    return nums.reduce((prev, cur) => {
        return prev + cur;
    }, 0)
}
<%_ } else { _%> 
const add = (...nums) => {
    return nums.reduce((prev, cur) => {
        return prev + cur;
    }, 0)
}
<%_ } _%>

describe('add()方法测试', function() {
    this.timeout(5000)
    it('add方法不传值的时候返回的是0', () => {
        expect(add()).to.equal(0)
    });

    it('add方法可以接收多个值的求和结果', () => {
        expect(add(1,2,3,4)).to.equal(10);
    });

    it('这个测试用例有概率会执行', function() {
        if(Math.random() > 0.5) {
            this.skip();
        }else {
            expect(add()).to.equal(0);
        }
    });

    it.skip('这个测试用例不会执行，直接通过');

    it('该方法延迟执行', (done) => {
        setTimeout(() => {
            expect(add(1,2,3,4)).to.equal(10)
            done();
        }, 4500);
    });

})
