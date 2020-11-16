import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebElement, WebDriver, ElementFinder, Browser } from 'protractor';
import { Driver } from 'selenium-webdriver/chrome';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

let sameId = ((elem, id) => elem.element(by.name('idlist')).getText().then(text => text === id));
let sameMarca = ((elem, marca) => elem.element(by.name('marcalist')).getText().then(text => text === marca));
let sameAro = ((elem, aro) => elem.element(by.name('arolist')).getText().then(text => text === aro));
let sameData = ((elem, data) => elem.element(by.name('datalist')).getText().then(text => text === data));

let check = ((p) => p.then( a => a))
let pAND = ((p,q,r,s,) => p.then(a => q.then(b => r.then(c => s.then(d =>(a && b && c && d ) )))))

async function criarPneu(id, marca, aro, largura, custo, capacidade, kmh, treadwear, data){
    await browser.sleep(1000);
    await $("button[name='botaoInserir']").click();
    await $("input[name='idbox']").sendKeys(<string> id);
    await $("input[name='marcabox']").sendKeys(<string> marca);
    await $("input[name='arobox']").sendKeys(<string> aro);
    await $("input[name='largurabox']").sendKeys(<string>  largura);
    await $("input[name='custobox']").sendKeys(<string> custo);
    await $("input[name='capacidadebox']").sendKeys(<string> capacidade);
    await $("input[name='kmhbox']").sendKeys(<string> kmh);
    await $("input[name='treadwearbox']").sendKeys(<string> treadwear);
    await $("input[name='databox']").sendKeys(<string> data);
    await element(by.name('botaoSubmit')).click();
    await browser.switchTo().alert().accept();
}

async function deletarPneu(id){
    var alltyres : ElementArrayFinder = element.all(by.name('tyrelist'));  
    var sameids = alltyres.filter(elem => check(sameId(elem, id)));
    await sameids.all(by.name('botaoRemover')).click();
    await browser.switchTo().alert().accept();
}

async function assertElementsWithSameIDAllTyres(n, id) {
    var alltyres : ElementArrayFinder = element.all(by.name('tyrelist'));
    var sameids = alltyres.filter(elem =>
            elem.getText().then(text => text === id));
    await sameids.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameIDAllIds(n, id){
    var allIds : ElementArrayFinder = element.all(by.name('idlist'));
        var sameIds = allIds.filter(elem =>
                                      elem.getText().then(text => text === id));
        await sameIds.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}


defineSupportCode(function ({ Given, When, Then }) {

    //REGISTERING TYRE WITH SUCCESS
    Given(/^I am at the "tyrelist" page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Upen');
        await $("a[name='ListaPneus']").click();
    });   

    Given(/^I cannot see a tyre with "id" "([^\"]*)" in the tyres list$/, async (id) => {
        await assertElementsWithSameIDAllTyres(0, id);  
    });

    When(/^I try to register tyre "([^\"]*)" with "brand" "([^\"]*)", "rim" "(\d*)", "width" "(\d*)", "cost" "(\d*)", "capacity" "(\d*)", "mileage" "(\d*)", "treadwear" "(\d*)" and "date" "([^\"]*)"$/, async (id, marca, aro, largura, custo, capacidade, kmh, treadwear, data) => {
        await criarPneu(id, marca, aro, largura, custo, capacidade, kmh, treadwear, data);
    });

    Then(/^I can see tyre "([^\"]*)" with "brand" "([^\"]*)", "rim" "(\d*)" and "date" "([^\"]*)" in the tyres list$/, async (id, marca, aro, data) => {
        var alltyres : ElementArrayFinder = element.all(by.name('tyrelist'));

        await alltyres.filter(elem => pAND(sameId(elem,id),sameMarca(elem,marca), sameAro(elem, aro), sameData(elem, data))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    //DELETING TYRE WITH REGISTERED ID
    Given(/^I can see a tyre with "id" "([^\"]*)" with "brand" "([^\"]*)", "rim" "(\d*)", "width" "(\d*)", "cost" "(\d*)", "capacity" "(\d*)", "mileage" "(\d*)", "treadwear" "(\d*)" and "date" "([^\"]*)" in the tyres list$/, async (id, marca, aro, largura, custo, capacidade, kmh, treadwear, data) => {
        await criarPneu(id, marca, aro, largura, custo, capacidade, kmh, treadwear, data);
        await assertElementsWithSameIDAllIds(1, id);
    });


    When(/^I try to delete tyre with "id" "([^\"]*)"$/, async(id) =>{
        await deletarPneu(id);
    });

    Then(/^I can no longer see tyre with "id" "([^\"]*)" in the tyres list$/, async (id) => {
        await assertElementsWithSameIDAllTyres(0, id);
    });

    
    //RESTORING A TYRE FROM THE TRASH BIN
    Given(/^I can see tyre with "id" "([^\"]*)" with "brand" "([^\"]*)", "rim" "(\d*)", "width" "(\d*)", "cost" "(\d*)", "capacity" "(\d*)", "mileage" "(\d*)", "treadwear" "(\d*)" and "date" "([^\"]*)" in the tyres list$/, async (id, marca, aro, largura, custo, capacidade, kmh, treadwear, data) => {
        await criarPneu(id, marca, aro, largura, custo, capacidade, kmh, treadwear, data);
        await assertElementsWithSameIDAllIds(1, id);
    });

    When(/^I delete tyre with "id" "([^\"]*)"$/, async(id) =>{
        await deletarPneu(id);
        await assertElementsWithSameIDAllTyres(0, id);
    });

    When(/^I click on the "trashbin" to go to the list of deleted tyres$/, async() => {
        await $("button[name='botaoLixeira']").click();
        await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/lixeirapneus');
    });

    When(/^I try to restore tyre with "id" "([^\"]*)" back to the tyres list$/, async(id) => {
        var alltyres : ElementArrayFinder = element.all(by.name('lixeiralist'));  
        var sameids = alltyres.filter(elem => check(sameId(elem, id)));
        await sameids.all(by.name('restoreButton')).click();
        await browser.switchTo().alert().accept();
        await $("button[name='quitButton']").click();
        await expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost:4200/pneus');
    });

    Then(/^I can see tyre with "id" "([^\"]*)" in the tyres list$/, async(id) => {
        await assertElementsWithSameIDAllIds(1, id);
    });


    //VISUALIZING TYRE
    Given(/^I see tyre with "id" "([^\"]*)" with "brand" "([^\"]*)", "rim" "(\d*)", "width" "(\d*)", "cost" "(\d*)", "capacity" "(\d*)", "mileage" "(\d*)", "treadwear" "(\d*)" and "date" "([^\"]*)" in the tyres list$/, async (id, marca, aro, largura, custo, capacidade, kmh, treadwear, data) => {
        await criarPneu(id, marca, aro, largura, custo, capacidade, kmh, treadwear, data);
        await assertElementsWithSameIDAllIds(1, id);
    });

    When(/^I type "([^\"]*)" on the "search bar" and press the search button$/, async(id) => {
        await $("input[name='searchBar']").sendKeys(<string>  id);
        await element(by.name('buttonSearch')).click();
        var alltyres : ElementArrayFinder = element.all(by.name('tyrelist'));  
        var sameids = alltyres.filter(elem => check(sameId(elem, id)));
        await sameids.all(by.name('blocolist')).click();
    })

    Then(/^I am at the page of the tyre with "id" "([^\"]*)"$/, async(id) => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(`http://localhost:4200/pneus/${id}`);
    })
})