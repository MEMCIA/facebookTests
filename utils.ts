import {Builder, Key, WebElement, WebDriver, until, Locator} from "selenium-webdriver";
import { Driver, Options } from "selenium-webdriver/chrome";

export async function getElement(locator:Locator, driver:WebDriver)
{
    let element = await driver.wait(async ()=> await checkIfElementsExist(locator, driver)); 
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

export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    return elements.find(element => element.isDisplayed);
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

export async function createDriver()
{
    let options = new Options();
    //disabled to prevent site from asking permission to show notifications 
    options.addArguments("--disable-notifications");
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    return driver;
}