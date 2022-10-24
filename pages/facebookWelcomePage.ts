import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { clickElementWithLocator, getElement } from "../utils";

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
        let locatorSearchButton = By.css("input[placeholder = 'Szukaj na Facebooku']");
        await clickElementWithLocator(locatorSearchButton, this._driver, false);
    }

    async enterWordInSearch(word:string)
    {
        let locatorFinder = By.xpath("//input[placeholder = 'Szukaj na Facebooku']");
        let searchElement = await clickElementWithLocator(locatorFinder, this._driver, false);
        await searchElement.sendKeys(word, Key.RETURN);
    }

    private _driver:WebDriver;
    public static readonly Url = "https://www.facebook.com/?sk=welcome";
}