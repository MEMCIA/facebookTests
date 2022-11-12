import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chromedriver";
import {FacebookStartPage} from "../pages/facebookStartPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { User } from "../user";
import { expect } from "chai";
import { FacebookMenuBar } from "../pages/facebookMenuBar";
import { FacebookSearchPage } from "../pages/facebookSearchPage";
import { createDriver } from "../utils";

describe("tests of functionality of Facebook's search page", function()
{
    let driver: WebDriver;
    let startPage: FacebookStartPage;
    let welcomePage: FacebookWelcomePage;
    let user: User;
    let menuBar: FacebookMenuBar;
    let searchPage: FacebookSearchPage;

    before(async ()=> 
    {
        driver = await createDriver();
        //language of user should be set to polish
        user = new User("styuurowsz_1666447403@tfbnw.net","12345T");
        startPage = new FacebookStartPage(driver, user);
        welcomePage = new FacebookWelcomePage(driver);
        menuBar = new FacebookMenuBar(driver);
        searchPage = new FacebookSearchPage(driver);
        await startPage.prepareToTestsOnUserAccount();
    })

    it("should shows searched word in header", async function()
    {
        let wordToSearch = "McDonald";
        await menuBar.clickSearch();
        await menuBar.enterWordInSearch(wordToSearch);
        let wordInHeader = await searchPage.findWordInResultHeader();
        expect(wordInHeader).to.be.equal(wordToSearch);
    } )

    after( async ()=> 
    {
        await menuBar.logout();
        await driver.quit();
    })
})
