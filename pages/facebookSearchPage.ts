import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { clickElementWithLocator, enterTextInElementWithLocator, getElement } from "../utils";

export class FacebookSearchPage
{

    constructor(driver:WebDriver)
    {
        this._driver = driver;
    }

    async findWordInResultHeader()
    {
        let locatorHeader = By.css("h1[tabindex='-1']");
        let header = await getElement(locatorHeader, this._driver);
        return await header.findElement(By.css("span")).getText();  
    }

    private _driver:WebDriver;
}