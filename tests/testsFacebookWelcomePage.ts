import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import "chromedriver";
import {FacebookStartPage} from "../pages/facebookStartPage";
import { FacebookWelcomePage } from "../pages/facebookWelcomePage";
import { User } from "../user";
import { getElementByCSS, getElementByXPath } from "../utils";

describe("tests of functionality of Facebook's welcome page", function()
{
    let driver: WebDriver;
    let startPage: FacebookStartPage;
    let welcomePage: FacebookWelcomePage;
    let user: User;

    before(async ()=> 
    {
        driver = await new Builder().forBrowser("chrome").build();
        //language of user should be set to polish
        user = new User("styuurowsz_1666447403@tfbnw.net","12345T");
        startPage = new FacebookStartPage(driver, user);
        await startPage.prepareToTestsOnUserAccount(FacebookWelcomePage.Url);
    })

    it("should shows searched word", async function()
    {
        let wordToSearch = "McDonald";
        //await welcomePage.enterWordInSearch(wordToSearch);
        let xPath = "input[placeholder = 'Szukaj na Facebooku']";
        let searchElement = await getElementByCSS(xPath, driver);
        await searchElement.click();
        searchElement = await getElementByCSS(xPath, driver);
        await searchElement.sendKeys("k", Key.RETURN);
        
    } )

    //after( async ()=> await driver.quit());
})