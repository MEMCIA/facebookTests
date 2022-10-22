import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { elementIsVisible } from "selenium-webdriver/lib/until";

export async function getElementByCSS(css:string)
{
    //await this._driver.wait(async d=> (await d.findElements(By.css(css))).length != 0,500)
    let element = await this._driver.findElement(By.css(css));
    await this._driver.wait(until.elementIsVisible(element), 500);
    return element;
}

export async function getElementByXPath(xPath:string)
{
    //await this._driver.wait(async d=> (await d.findElements(By.xpath(xPath))).length != 0,500)
    let element = await this._driver.findElement(By.xpath(xPath));
    await this._driver.wait(until.elementIsVisible(element), 500);
    return element;
}
