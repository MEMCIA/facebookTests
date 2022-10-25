import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { clickElementWithLocator, enterTextInElementWithLocator, getElement } from "../utils";

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

    private _driver:WebDriver;
    public static readonly Url = "https://www.facebook.com/?sk=welcome";
}