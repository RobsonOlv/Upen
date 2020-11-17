import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
import { Driver } from 'selenium-webdriver/firefox';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var base_url = "http://localhost:4200/pneus";

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

defineSupportCode(function ({ Given, When, Then}) {

    Given(/^I'm in page of tire "([^\"]*)"$/, async (id) => {
        browser.sleep(500);
        await browser.get(base_url + "/" + id);
        await expect(browser.getTitle()).to.eventually.equal('Upen');
    });

    Given(/^I see that the tire is not assigned to a vehicle$/, async () => {
        await expect(element(by.id("veiculo-atribuicao-valor")).getText()).to.eventually.equal("X");
    })

    Given(/^I see the option "([^\"]*)"$/, async (text) => {
        await expect($("input[class='botao-lateral-excluir']").getAttribute("value")).to.eventually.equal("Excluir");
    })

    Given(/^I see that the tire "([^\"]*)" have "([^\"]*)" in Kms field and "([^\"]*)" in Custo field and a empty list of events$/, async (id, kms, custo) => {
        await expect(element(by.id("pneu-custo")).getAttribute("placeholder")).to.eventually.equal(custo);
        await expect(element(by.id("pneu-kms")).getAttribute("placeholder")).to.eventually.equal(kms);
    })

    Given(/^And I see the option "([^\"]*)"$/, async (cb) => {
        await expect($("input[class='botao-lateral-excluir']").getAttribute("value")).to.eventually.equal(cb);
    })

    When(/^I try to assign the tire to the vehicle with plate "([^\"]*)" in position "([^\"]*)" and side "([^\"]*)"$/, async (plate, position, side) => {
        await $("input[id='veiculo-placa']").sendKeys(<string>plate);
        await $("input[id='veiculo-posicao']").sendKeys(<string>position);
        await $("input[id='veiculo-lado']").sendKeys(<string>side);
        await element(by.buttonText('Atribuir')).click();
    });

    Then(/^I'm  still on the tire page of tire "([^\"]*)"$/, async (id) => {
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_url + "/" + id);
    });

    Then(/^I can see that the tire has been assigned to a vehicle with plate "ROB2121" in position "Traseira" and side "Esquerda"$/, async () => {
        await expect(element(by.id("veiculo-atribuicao-valor")).getText()).to.eventually.equal("V");
    });

    When(/^I try to delete the tire "([^\"]*)"$/, async (id) => {
        await element(by.className("botao-lateral-excluir")).click();
    });
   

    Then(/^I see an alert "([^\"]*)"$/, async (text) => {
        browser.sleep(4000);
        await expect((browser.switchTo().alert()).getText()).to.eventually.equal(text);
        browser.navigate().refresh();
        (await browser.switchTo().alert()).accept().catch(function(ex){
            
        });
    });

    Then(/^I'm redirected to page of tires list$/, async () => {
        browser.navigate().refresh().catch(function() {
            return browser.switchTo().alert().then(function (alert) {
                  // Is this expected?
            });
        });
        await expect(browser.getCurrentUrl()).to.eventually.equal(base_url);
    });

    When(/^I try to calculate the cost-benefit$/, async () => {
        await element(by.className("botao-lateral-custo-beneficio")).click();
    });

    Then(/^I see a pop-up with four fields: "([^\"]*)", "([^\"]*)", "([^\"]*)" and "([^\"]*)"$/, async (kms, custo, kmc, coef) => {
        await expect(element(by.className("modal-body-dados-custo")).getText()).to.eventually.equal(custo);
        await expect(element(by.className("modal-body-dados-kms")).getText()).to.eventually.equal(kms);
        await expect(element(by.id("cbResult1")).getText()).to.eventually.equal(kmc);
        await expect(element(by.id("cbResult2")).getText()).to.eventually.equal(coef);
    });

    Then(/^I see a capital letter with value "([^\"]*)" in top$/, async (value) => {
        await expect(element(by.id("cbResultValueLetter")).getText()).to.eventually.equal(value);
    });

})