import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"

export class FacebookPLMainPage
{

    constructor(driver:WebDriver)
    {
        this._driver = driver;
    }

    async open()
    {
        await this._driver.get(FacebookPLMainPage.Url);
    }

    private _driver:WebDriver;
    public static readonly Url = "https://www.facebook.com/";
}
