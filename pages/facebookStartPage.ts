import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { elementIsVisible } from "selenium-webdriver/lib/until";
import { User } from "../user";
import { checkIfUrlIsTheSame, clickElementWithLocator, enterTextInElementWithLocator, waitUntilUrlIsTheSame } from "../utils";

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
        let locatorButtonEssentialCookiesAccept = By.css("button[title='Zezwól tylko na niezbędne pliki cookie']");
        await clickElementWithLocator(locatorButtonEssentialCookiesAccept, this._driver, true);
    }

    async acceptOnlyEssentialCookiesAfterLogin()
    {
        let urlCookies = "https://www.facebook.com/privacy/consent/user_cookie_choice/?source=pft_user_cookie_choice";
        let isRequestToAcceptCookies = await checkIfUrlIsTheSame(urlCookies, this._driver);
        if (!isRequestToAcceptCookies) return;
        
        let locatorButtonEssentialCookiesAccept = By.xpath("//span[text()='Zezwól tylko na niezbędne pliki cookie']");
        await clickElementWithLocator(locatorButtonEssentialCookiesAccept, this._driver, true);
    }

    async login()
    {
        await this.enterEmail();
        await this.enterPassword();
    }

    async enterEmail()
    {
        let locatorIdEmail = By.id("email");
        await enterTextInElementWithLocator(locatorIdEmail, this._driver, this._user.email, false, false);
    }

    async enterPassword()
    {
        let locatorIdPassword = By.id("pass");
        await enterTextInElementWithLocator(locatorIdPassword, this._driver, this._user.password, true, true);
    }

    async prepareToTestsOnUserAccount(url:string)
    {
        await this.open();
        await this.acceptOnlyEssentialCookiesBeforeLogin();
        await this.login();
        await this.acceptOnlyEssentialCookiesAfterLogin();
        await waitUntilUrlIsTheSame(url, this._driver);
    }

    private _user: User;
    private _driver:WebDriver;
    public static readonly Url = "https://pl-pl.facebook.com/";
}