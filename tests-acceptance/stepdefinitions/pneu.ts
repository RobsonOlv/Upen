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
})