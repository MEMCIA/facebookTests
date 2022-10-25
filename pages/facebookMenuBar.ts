import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { clickElementWithLocator, enterTextInElementWithLocator, getElement } from "../utils";

export class FacebookMenuBar
{

    constructor(driver:WebDriver)
    {
        this._driver = driver;
    }

    async clickSearch()
    {
        let locatorSearchButton = By.css("input[placeholder = 'Szukaj na Facebooku']");
        await clickElementWithLocator(locatorSearchButton, this._driver, false);
    }

    async enterWordInSearch(word:string)
    {
        let locatorFinder = By.css("input[placeholder = 'Szukaj na Facebooku']");
        await enterTextInElementWithLocator(locatorFinder, this._driver, word, true, false);
    }

    async clickAccountSymbol()
    {
        let  locatorAccountSymbol = By.css("svg[aria-label='Twój profil']");
        await clickElementWithLocator(locatorAccountSymbol, this._driver, false);
    }

    async logout()
    {
        await this.clickAccountSymbol();
        let locatorButtonLogout =  By.xpath("//span[contains(text(),'Wyloguj')]");
        await clickElementWithLocator(locatorButtonLogout, this._driver, false);
    }

    private _driver:WebDriver;
}