import {By, Key, WebElement, WebDriver, until, Locator} from "selenium-webdriver";
import { elementIsVisible } from "selenium-webdriver/lib/until";

export async function getElement(locator:Locator, driver:WebDriver)
{
    await waitToFindElement(locator,driver);
    let element = await driver.findElement(locator);
    await driver.wait(until.elementIsVisible(element));
    return element;
}

export async function getElements(locator:Locator, driver:WebDriver)
{
    await waitToFindElement(locator,driver);
    let elements = await driver.findElements(locator);
    let lastElementIndex = 0;
    if (elements.length!=0) lastElementIndex = elements.length - 1;
    await driver.wait(until.elementIsVisible(elements[lastElementIndex]));
    return elements;
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

export async function waitToFindElement(locator:Locator, driver:WebDriver) 
{
    await driver.wait(async ()=> await checkIfElementsExist(locator, driver));   
}

export function getRandomText(length:number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
} 

export function getRandomNumber(length:number)
{
    var result= "";

    for(var i = 0; i<length;i++)
    {
        result += Math.floor(Math.random() * 10);
    }

    return Number(result);
}