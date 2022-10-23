import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver";
import { elementIsVisible } from "selenium-webdriver/lib/until";

export async function getElementByCSS(css:string, driver:WebDriver)
{
    await driver.wait(async d=> (await d.findElements(By.css(css))).length != 0,1000)
    let element = await driver.findElement(By.css(css));
    await driver.wait(until.elementIsVisible(element), 1000);
    return element;
}

export async function getElementByXPath(xPath:string, driver:WebDriver)
{
    await driver.wait(async d=> (await d.findElements(By.xpath(xPath))).length != 0, 1000)
    let element = await driver.findElement(By.xpath(xPath));
    await driver.wait(until.elementIsVisible(element),1000);
    return element;
}
