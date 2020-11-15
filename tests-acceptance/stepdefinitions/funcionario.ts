import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameFunction = ((elem, ffunction) => elem.element(by.name('funcaolist')).getText().then(text => text === ffunction));
let samePhone = ((elem, phone) => elem.element(by.name('telefonelist')).getText().then(text => text === phone));
let samePlate = ((elem, plate) => elem.element(by.name('placalist')).getText().then(text => text === plate));


let pAND = ((p,q,r,s) => p.then(a => q.then(b => r.then(c => s.then(d => (a && b && c && d))))))

defineSupportCode(function ({ Given, When, Then}) {
    Given(/^I am at the employees page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Upen')
        await $("a[name='funcionarios']").click();

    });

    Given(/^I cannot see an employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter( elem => sameCPF(elem,cpf));
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
        await $("input[name='telefonebox']").sendKeys(<string> "81988751222");
        await element(by.name('cadastrarbutton')).click();
        var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
        await allemployees.filter(elem => pAND(sameName(elem,"Junior"),sameCPF(elem,cpf),sameFunction (elem,"Mecanico"),samePhone(elem,"81988751222"))).then
                (elems => expect (Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^I try to remove the employee with CPF "(\d*)"$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        // timeout necessário para o dialog fechar corretamente e poder clicar no botão de remoção.
        await browser.sleep(1000)
        await samecpf.all(by.name('removerfuncbutton')).click();
        
    });

    Then(/^I cannot see "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)" in the employees list$/, async(name,cpf,efunction,pnumber) => {
        var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
        await allemployees.filter(elem => pAND(sameName(elem,name),sameCPF(elem,cpf),sameFunction (elem,efunction),samePhone(elem,pnumber))).then
                (elems => expect (Promise.resolve(elems.length)).to.eventually.equal(0));

    });

    When(/^I try to assign a vehicle with plate "([^\"]*)" to the employee with CPF "(\d*)"$/, async(plate,cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        await samecpf.all(by.name('openatribbutton')).click();
        var allplates: ElementArrayFinder = element.all(by.name('listaVeic'));
        var sameplate = allplates.filter(elem => samePlate(elem,plate));
        await sameplate.all(by.name('atribuirbutton')).click();
        await element.all(by.name('finalizarbutton')).click();
    });

    Then(/^I can see the the plate "([^\"]*)" in the employee with CPF "(\d*)" vehicles list$/, async(plate,cpf) => {
        await browser.refresh()
        await browser.sleep(1000)
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        await samecpf.all(by.name('vehiclelist')).click();
        var allplates = element(by.cssContainingText('mat-option .mat-option-text', <string> plate));
        await expect (allplates.getText()).to.eventually.equal(<string> plate)
        
    });

    Given(/^I can see an employee with CPF "(\d*)" assigned with "([^\"]*)" in the employees list$/, async (cpf,plate) => {
        await element(by.name('dialogcadastrobutton')).click();
        await $("input[name='nomebox']").sendKeys(<string> "Antonio");
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='funcaobox']").sendKeys(<string> "Vistoria");
        await $("input[name='telefonebox']").sendKeys(<string> "81993751222");
        await element(by.name('cadastrarbutton')).click();
        var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
        await allemployees.filter(elem => pAND(sameName(elem,"Antonio"),sameCPF(elem,cpf),sameFunction (elem,"Vistoria"),samePhone(elem,"81993751222"))).then
                (elems => expect (Promise.resolve(elems.length)).to.eventually.equal(1));
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        await samecpf.all(by.name('openatribbutton')).click();
        var allplates: ElementArrayFinder = element.all(by.name('listaVeic'));
        var sameplate = allplates.filter(elem => samePlate(elem,plate));
        await sameplate.all(by.name('atribuirbutton')).click();
        await element.all(by.name('finalizarbutton')).click();
        await browser.refresh()
        var searchcpf: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpffunc = searchcpf.filter( elem => sameCPF(elem,cpf));
        await samecpffunc.all(by.name('vehiclelist')).click();
        var allplatesfunc = element(by.cssContainingText('mat-option .mat-option-text', <string> plate));
        await expect (allplatesfunc.getText()).to.eventually.equal(<string> plate)
        
    });

    When(/^I try to unassign the vehicle with plate "([^\"]*)" from the employee with CPF "(\d*)"$/, async (plate,cpf) => {
        await browser.refresh()
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        await samecpf.all(by.name('openatribbutton')).click();
        var allplates: ElementArrayFinder = element.all(by.name('listaVeic'));
        var sameplate = allplates.filter(elem => samePlate(elem,plate));
        await sameplate.all(by.name('desatribuirbutton')).click();
        await element.all(by.name('finalizarbutton')).click();
    });

    Then(/^I cannot see the vehicle plate "([^\"]*)" in the employee with CPF "(\d*)" vehicles list$/, async (plate,cpf) => {
        await browser.refresh()
        await browser.sleep(1000)
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        await samecpf.all(by.name('vehiclelist')).click();
        var allplates = element(by.cssContainingText('mat-option .mat-option-text', "Nenhum"));
        await expect (allplates.getText()).to.eventually.equal("Nenhum")

    });





})