import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { elementIsVisible } from "selenium-webdriver/lib/until";
import { User } from "../user";

export class FacebookStartPage
{

    constructor(driver:WebDriver, user:User)
    {
        this._driver = driver;
        this._user = user;

    }

    async open()
    {
        await this._driver.get(FacebookStartPage.Url);
    }

    async acceptOnlyEssentialCookiesBeforeLogin()
    {
        let pathCss = "button[title='Zezwól tylko na niezbędne pliki cookie']";
        let button = await this._driver.findElement(By.css(pathCss));
        await this._driver.wait(until.elementIsVisible(button),500);
        await button.click();
        await this._driver.wait(async d=>(await d.findElements(By.css(pathCss))).length == 0 ,500);
    }

    async acceptOnlyEssentialCookiesAfterLogin()
    {
        let urlCookies = "https://www.facebook.com/privacy/consent/user_cookie_choice/?source=pft_user_cookie_choice"
        let isRequestToAcceptCookies = await this._driver.getCurrentUrl() == urlCookies;
        if (!isRequestToAcceptCookies) return;
        let xPath = "//span[text()='Zezwól tylko na niezbędne pliki cookie']";
        let button = await this._driver.findElement(By.xpath(xPath));
        await this._driver.wait(until.elementIsVisible(button),500);
        await button.click();
        await this._driver.wait(async d =>(await d.findElements(By.xpath(xPath))).length == 0, 500);
    }

    async login()
    {
        await this.enterEmail();
        await this.enterPassword();
    }

    async enterEmail()
    {
        let idEmail = "email";
        await this._driver.wait(async d=> (await d.findElements(By.id(idEmail))).length != 0,500)
        let emailElement = await this._driver.findElement(By.id(idEmail));
        await this._driver.wait(until.elementIsVisible(emailElement), 500);
        emailElement.sendKeys(this._user.email);
    }

    async enterPassword()
    {
        let idPassword = "pass";
        let passwordElement = await this._driver.findElement(By.id(idPassword));
        await this._driver.wait(until.elementIsVisible(passwordElement), 500);
        await passwordElement.sendKeys(this._user.password, Key.RETURN);
        await this._driver.wait(async d=>(await d.findElements(By.id(idPassword))).length == 0, 500);
    }

    async prepareToTestsOnUserAccount(url:string)
    {
        await this.open();
        await this.acceptOnlyEssentialCookiesBeforeLogin();
        await this.login();
        await this.acceptOnlyEssentialCookiesAfterLogin();
        await this._driver.wait(async d=>(await d.getCurrentUrl() == url), 500);
    }

    private _user: User;
    private _driver:WebDriver;
    public static readonly Url = "https://pl-pl.facebook.com/";
}