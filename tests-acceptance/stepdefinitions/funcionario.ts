import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameFunction = ((elem, ffunction) => elem.element(by.name('funcaolist')).getText().then(text => text === ffunction));
let samePhone = ((elem, phone) => elem.element(by.name('telefonelist')).getText().then(text => text === phone));



let pAND = ((p,q,r,s) => p.then(a => q.then(b => r.then(c => s.then(d => (a && b && c && d))))))

defineSupportCode(function ({ Given, When, Then}) {
    Given(/^I am at the employees page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Upen')
        await $("a[name='funcionarios']").click();

    });

    Given(/^I cannot see an employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter( elem => elem.getText().then(text => text ===cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));

    });

    When(/^I try to register the employee "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)"$/, async (name,cpf,efunction,pnumber) => {
        await element(by.name('dialogcadastrobutton')).click();
        await $("input[name='nomebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='funcaobox']").sendKeys(<string> efunction);
        await $("input[name='telefonebox']").sendKeys(<string> pnumber);
        await element(by.name('cadastrarbutton')).click();

    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)" in the employees list$/, async (name,cpf,efunction,pnumber) => {
        var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
        await allemployees.filter(elem => pAND(sameName(elem,name),sameCPF(elem,cpf),sameFunction (elem,efunction),samePhone(elem,pnumber))).then
                (elems => expect (Promise.resolve(elems.length)).to.eventually.equal(1));

    });

    Given(/^I can see an employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        await element(by.name('dialogcadastrobutton')).click();
        await $("input[name='nomebox']").sendKeys(<string> "Junior");
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='funcaobox']").sendKeys(<string> "Mecanico");
        await $("input[name='telefonebox']").sendKeys(<number> 81988751222);
        await element(by.name('cadastrarbutton')).click();
        var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
        await allemployees.filter(elem => sameCPF(elem,cpf)).then
                (elems => expect (Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I try to remove the employee with CPF "(\d*)"$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpfs = allcpfs.filter( elem => sameCPF(elem,cpf));
        // timeout necessário para o dialog fechar corretamente e poder clicar no botão de remoção.
        await browser.sleep(1000)
        await samecpfs.all(by.name('removerfuncbutton')).click();
        
    });

    Then(/^I cannot see the employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter( elem => elem.getText().then(text => text ===cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));

    });

})