import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chromedriver";
import {FacebookStartPage} from "../pages/facebookStartPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { User } from "../user";
import { expect } from "chai";
import { FacebookMenuBar } from "../pages/facebookMenuBar";
import { FacebookSearchPage } from "../pages/facebookSearchPage";
import { FacebookPLMainPage } from "../pages/facebookPLMainPage";
import { getElement, getRandomText } from "../utils";

describe("tests of functionality of Facebook's main page", function()
{
    let driver: WebDriver;
    let startPage: FacebookStartPage;
    let welcomePage: FacebookWelcomePage;
    let user: User;
    let menuBar: FacebookMenuBar;
    let searchPage: FacebookSearchPage;
    let mainPage: FacebookPLMainPage

    before(async ()=> 
    {
        driver = await new Builder().forBrowser("chrome").build();
        //language of user should be set to polish
        user = new User("styuurowsz_1666447403@tfbnw.net","12345T");
        startPage = new FacebookStartPage(driver, user);
        welcomePage = new FacebookWelcomePage(driver);
        menuBar = new FacebookMenuBar(driver);
        searchPage = new FacebookSearchPage(driver);
        mainPage = new FacebookPLMainPage(driver);
        await startPage.prepareToTestsOnUserAccount(FacebookWelcomePage.Url);
    })

    it("should appear a post with entered text", async function()
    { 
        await mainPage.open();
        let postContent = getRandomText(10);
        await mainPage.makePost(postContent);
        let postContainsText = await mainPage.checkIfPostHasCertainText(postContent);
        expect(postContainsText).to.be.true;    
    } )

    after( async ()=> 
    {
        mainPage.deleteAllPosts();
        //await menuBar.logout();
        //await driver.quit();
    })
})
