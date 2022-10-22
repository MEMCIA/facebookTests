import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { getElementByCSS, getElementByXPath } from "../utils";

export class FacebookWelcomePage
{

    constructor(driver:WebDriver)
    {
        this._driver = driver;
    }

    async open()
    {
        await this._driver.get(FacebookWelcomePage.Url);
    }

    async clickSearch()
    {
        let cssPath = "input[placeholder = 'Szukaj na Facebooku']";
        await getElementByCSS(cssPath);
    }

    async enterWordInSearch(word:string)
    {
        let xPath = "input[placeholder = 'Szukaj na Facebooku']";
        let searchElement = await getElementByXPath(xPath);
        searchElement.click();
        searchElement = await getElementByXPath(xPath);
        await searchElement.sendKeys(word, Key.RETURN);
    }

    private _driver:WebDriver;
    public static readonly Url = "https://www.facebook.com/?sk=welcome";
}