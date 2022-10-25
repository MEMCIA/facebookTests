import {By, Builder, WebElement, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import "chromedriver";
import { FacebookStartPage } from "../pages/facebookStartPage";
import { User } from "../user";
import { FacebookPLMainPage } from "../pages/facebookPLMainPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { FacebookMenuBar } from "../pages/facebookMenuBar";

describe("login test of polish facebook's site", function()
{
    let driver:WebDriver;
    let startPagePL: FacebookStartPage;
    let user:User;
    let menuBar: FacebookMenuBar;

    before( async ()=>
    {
        driver = await new Builder().forBrowser("chrome").build();
        //language of user should be set to polish
        user = new User("fezqbutwoa_1666692643@tfbnw.net","12345T");  
        startPagePL = new FacebookStartPage(driver, user);    
        menuBar = new FacebookMenuBar(driver);
        await startPagePL.open();
        await startPagePL.acceptOnlyEssentialCookiesBeforeLogin();  
    })

    it("login should take user to the facebook's welcome page", async function()
    { 
        await startPagePL.login();
        await startPagePL.acceptOnlyEssentialCookiesAfterLogin();
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.be.equal(FacebookWelcomePage.Url);
    })

    after(async ()=>
    {
        //await menuBar.logout();
        //await driver.quit();
    })
})