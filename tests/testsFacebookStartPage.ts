import {By, Builder, WebElement, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import "chromedriver";
import { FacebookStartPage } from "../pages/facebookStartPage";
import { User } from "../user";
import { FacebookPLMainPage } from "../pages/facebookPLMainPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { FacebookMenuBar } from "../pages/facebookMenuBar";
import { clickElementWithLocator, createDriver, getElement } from "../utils";
import { FacebookLogOutPage } from "../pages/facebookLogOutPage";

describe("test of log out button", function()
{
    let driver:WebDriver;
    let startPagePL: FacebookStartPage;
    let user:User;
    let menuBar: FacebookMenuBar;
    let locatorButtonLogout =  By.xpath("//span[contains(text(),'Wyloguj')]");

    before( async ()=>
    {
        driver = await createDriver();
        //language of user should be set to polish
        user = new User("kvfguxflve_1667937336@tfbnw.net","12345T");  
        startPagePL = new FacebookStartPage(driver, user);    
        menuBar = new FacebookMenuBar(driver);
       await startPagePL.prepareToTestsOnUserAccount();
        }
    })

    it("after login button log out is accessible", async function()
    { 
        await menuBar.clickAccountSymbol();
        try {
            let buttonLogOut = getElement(locatorButtonLogout, driver);
            expect(buttonLogOut).not.to.be.null;
        } catch (error) {
            expect(error).to.be.null;
        }
    })

    after(async ()=>
    {
        await clickElementWithLocator(locatorButtonLogout, driver, false);
        await driver.quit();
    })
})
