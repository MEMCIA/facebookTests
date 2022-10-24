import {By, Key, WebElement, WebDriver, until, Locator} from "selenium-webdriver";
import { elementIsVisible } from "selenium-webdriver/lib/until";

export async function getElement(locator:Locator, driver:WebDriver)
{
    await WaitToFindElement(locator,driver);
    let element = await driver.findElement(locator);
    await driver.wait(until.elementIsVisible(element));
    return element;
}

export async function clickElementWithLocator(locator:Locator, driver:WebDriver, afterWaitForElementToDisappear:boolean)
{
    let element = await getElement(locator, driver);
    await element.click();
    if(!afterWaitForElementToDisappear) return element;
    waitForElementToDisappear(locator, driver);
}

export async function enterTextInElementWithLocator(locator:Locator, driver:WebDriver, text:string, withReturnKey:boolean, afterWaitForElementToDisappear:boolean)
{
    let element = await getElement(locator, driver);
    await element.sendKeys(text);
    if(withReturnKey) await element.sendKeys(Key.RETURN);
    if(!afterWaitForElementToDisappear) return;
    await waitForElementToDisappear(locator, driver);
}

export async function waitForElementToDisappear(locator:Locator, driver:WebDriver)
{
    await driver.wait(async () =>(await checkIfElementDisappeared(locator, driver)));
}

async function checkIfElementDisappeared(locator:Locator, driver:WebDriver)
{
   let elements = await (driver.findElements(locator));
   return elements.length == 0;
}

export async function waitUntilUrlIsTheSame(url:string, driver:WebDriver)
{
    await driver.wait(async ()=>(await checkIfUrlIsTheSame(url, driver)));
}

export async function checkIfUrlIsTheSame(url:string, driver:WebDriver)
{
    return await driver.getCurrentUrl() == url;
}

export async function checkIfElementsExist(locator:Locator, driver:WebDriver)
{
    let elements = await driver.findElements(locator);
    return elements.length != 0;
}

export async function WaitToFindElement(locator:Locator, driver:WebDriver) 
{
    await driver.wait(async ()=> checkIfElementsExist(locator, driver));   
}