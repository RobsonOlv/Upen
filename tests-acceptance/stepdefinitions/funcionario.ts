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

async function cadastrarFunc(name,cpf,ffunction,telephone) {
        await element(by.name('dialogcadastrobutton')).click();
        await $("input[name='nomebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='funcaobox']").sendKeys(<string> ffunction);
        await $("input[name='telefonebox']").sendKeys(<string> telephone);
        await element(by.name('cadastrarbutton')).click();
}

async function assertEqualSize(set,n) {
    await set.then(elems => expect (Promise.resolve(elems.length)).to.eventually.equal(n));
    
}

async function assertElementsWithSameParameters(name,cpf,ffunction, telephone,n) {
    var allemployees: ElementArrayFinder = element.all(by.name('funclist'));
    var sameemployee = allemployees.filter(elem => pAND(sameName(elem,name),sameCPF(elem,cpf),sameFunction (elem,ffunction),samePhone(elem,telephone)))
    await assertEqualSize(sameemployee,n)
}

async function assertElementsWithSameCPF(cpf,n) {
    var allcpfs: ElementArrayFinder = element.all(by.name('cpflist'));
    var samecpfs = allcpfs.filter( elem => sameCPF(elem,cpf));
    assertEqualSize (samecpfs,n)
}


async function clickOnSameCPF(cpf, button) {
    var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
    var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
    await samecpf.all(by.name(button)).click();
    
}

async function clickOnSamePlate(plate,button) {
    var allplates: ElementArrayFinder = element.all(by.name('listaVeic'));
    var sameplate = allplates.filter(elem => samePlate(elem,plate));
    await sameplate.all(by.name(button)).click();
    await element.all(by.name('finalizarbutton')).click();
    
}


defineSupportCode(function ({ Given, When, Then}) {
    Given(/^I am at the employees page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Upen')
        await $("a[name='funcionarios']").click();

    });

    Given(/^I cannot see an employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        await assertElementsWithSameCPF(cpf,0);

    });

    When(/^I try to register the employee "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)"$/, async (name,cpf,ffunction,telephone) => {
        await cadastrarFunc(name,cpf,ffunction,telephone);

    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)" in the employees list$/, async (name,cpf,ffunction,telephone) => {
        await assertElementsWithSameParameters(name,cpf,ffunction,telephone,1);
    });

    Given(/^I can see an employee with CPF "(\d*)" in the employees list$/, async(cpf) => {
        await cadastrarFunc("Junior",cpf,"Mecanico","81988751222");
        await assertElementsWithSameParameters("Junior",cpf,"Mecanico","81988751222", 1)
    });

    When(/^I try to remove the employee with CPF "(\d*)"$/, async(cpf) => {
        var allcpfs: ElementArrayFinder = element.all(by.name('funclist'));
        var samecpf = allcpfs.filter( elem => sameCPF(elem,cpf));
        // timeout necessário para o dialog fechar corretamente e poder clicar no botão de remoção.
        await browser.sleep(1000)
        await samecpf.all(by.name('removerfuncbutton')).click();
        
    });

    Then(/^I cannot see "([^\"]*)" with CPF "(\d*)", function "([^\"]*)" and phone number "(\d*)" in the employees list$/, async(name,cpf,ffunction,telephone) => {
        await assertElementsWithSameParameters(name,cpf,ffunction,telephone,0)
    });

    When(/^I try to assign a vehicle with plate "([^\"]*)" to the employee with CPF "(\d*)"$/, async(plate,cpf) => {
        await clickOnSameCPF(cpf,'openatribbutton')
        await clickOnSamePlate (plate, 'atribuirbutton')
    });

    Then(/^I can see the the plate "([^\"]*)" in the employee with CPF "(\d*)" vehicles list$/, async(plate,cpf) => {
        await browser.refresh()
        await browser.sleep(1000)
        await clickOnSameCPF(cpf,'vehiclelist')
        var allplates = element(by.cssContainingText('mat-option .mat-option-text', <string> plate));
        await expect (allplates.getText()).to.eventually.equal(<string> plate)
        
    });


    Given(/^I can see an employee with CPF "(\d*)" assigned with "([^\"]*)" in the employees list$/, async (cpf,plate) => {
        await cadastrarFunc("Antonio", cpf, "Vistoria","81993751222")
        await assertElementsWithSameParameters("Antonio", cpf, "Vistoria", "81993751222", 1)
        await clickOnSameCPF(cpf,'openatribbutton')
        await clickOnSamePlate(plate,'atribuirbutton')
        await browser.refresh()
        await clickOnSameCPF(cpf,'vehiclelist')
        var allplatesfunc = element(by.cssContainingText('mat-option .mat-option-text', <string> plate));
        await expect (allplatesfunc.getText()).to.eventually.equal(<string> plate)
        
    });

    When(/^I try to unassign the vehicle with plate "([^\"]*)" from the employee with CPF "(\d*)"$/, async (plate,cpf) => {
        await browser.refresh()
        await clickOnSameCPF(cpf,'openatribbutton')
        await clickOnSamePlate(plate,'desatribuirbutton')
    });

    Then(/^I cannot see the vehicle plate "([^\"]*)" in the employee with CPF "(\d*)" vehicles list$/, async (plate,cpf) => {
        await browser.refresh()
        await browser.sleep(1000)
        await clickOnSameCPF(cpf,'vehiclelist')
        var allplates = element(by.cssContainingText('mat-option .mat-option-text', "Nenhum"));
        await expect (allplates.getText()).to.eventually.equal("Nenhum")

    });

})