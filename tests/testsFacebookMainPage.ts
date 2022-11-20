import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chromedriver";
import {FacebookStartPage} from "../pages/facebookStartPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { User } from "../user";
import { expect } from "chai";
import { FacebookMenuBar } from "../pages/facebookMenuBar";
import { FacebookSearchPage } from "../pages/facebookSearchPage";
import { FacebookPLMainPage } from "../pages/facebookPLMainPage";
import { createDriver, getElement, getRandomNumber, getRandomText } from "../utils";
import { Options } from "selenium-webdriver/chrome";

describe("tests of functionality of Facebook's main page", function()
{
    let driver: WebDriver;
    let startPage: FacebookStartPage;
    let welcomePage: FacebookWelcomePage;
    let user: User;
    let menuBar: FacebookMenuBar;
    let searchPage: FacebookSearchPage;
    let mainPage: FacebookPLMainPage;

    before(async ()=> 
    {   driver = await createDriver();
        //language of user should be set to polish
        user = new User("email","password");
        startPage = new FacebookStartPage(driver, user);
        welcomePage = new FacebookWelcomePage(driver);
        menuBar = new FacebookMenuBar(driver);
        searchPage = new FacebookSearchPage(driver);
        mainPage = new FacebookPLMainPage(driver);
        await startPage.prepareToTestsOnUserAccount();
    })

    it("should appear a post with entered text", async function()
    { 
        try {
            await mainPage.open();
            let postContent = String(getRandomNumber(10));
            await mainPage.makePost(postContent);
            let isRightTextInPost = await mainPage.waitForPostWithCertainText(postContent);
            expect(isRightTextInPost).to.be.true; 
          } catch (error) {
            expect(error).to.be.null;
            console.error(error.message);
          }   
    } )

    after( async ()=> 
    {
        await mainPage.deleteMostCurrentPost();
        await menuBar.logout();
        await driver.quit();
    })
})
