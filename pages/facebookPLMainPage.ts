import {By, Key, WebElement, WebDriver, until} from "selenium-webdriver"
import { clickElementWithLocator, enterTextInElementWithLocator, getElement, getElements, waitToFindElement } from "../utils";

export class FacebookPLMainPage
{

    constructor(driver:WebDriver)
    {
        this._driver = driver;
    }

    async open()
    {
        await this._driver.get(FacebookPLMainPage.Url);
    }

    async clickCreatePostWindow()
    {  
        let locatorPostWindow = By.xpath("//span[contains(text(), 'O czym myślisz')]");
        await clickElementWithLocator(locatorPostWindow, this._driver, true);
    }

    async enterTextInPost(text:string)
    {
        let locatorPostWindowExpanded = By.css("div[aria-label*='O czym myślisz']");
        let element = await getElement(locatorPostWindowExpanded, this._driver);
        await element
            .findElement(By.css('p'))
            .sendKeys(text);
    }

    async clickPublish()
    {
        let locatorPublishButton = By.xpath("//span[text()='Opublikuj']");   
        await clickElementWithLocator(locatorPublishButton, this._driver, true);
    }

    async makePost(text:string)
    {
        await this.clickCreatePostWindow();
        await this.enterTextInPost(text);
        await this.clickPublish();
    }

    async findMostCurrentPost()
    {
        let locatormostCurrentPost = By.css("div[data-pagelet='FeedUnit_0']");
        return await getElement(locatormostCurrentPost, this._driver);
    }

    async findPostWithText(text:string)
    {
        let locatorPost = By.xpath("//div[text()=text]");

    }

    async checkIfPostHasCertainText(text:string)
    {
        let mostCurrentPost = await this.findMostCurrentPost();
        //let locatorMostCurrentPostWithText = By.xpath("//div[text()=text]");
        //let isPostContentRight = (await mostCurrentPost.findElements(locatorMostCurrentPostWithText)).length !=0;
        let textInPostElement = await mostCurrentPost.getText();
        console.log(textInPostElement);
        console.log(text);
        return textInPostElement.includes(text);
    }

    async getAllPosts()
    {
        let locatorPosts = By.css("div[data-pagelet*='FeedUnit']");
        console.log((await getElements(locatorPosts, this._driver)).length + "number of posts");
        return await getElements(locatorPosts, this._driver);
    }

    async deleteAllPosts()
    {
        let posts = await this.getAllPosts();

        for (const element of posts) {
            console.log("aaa"+ await element.getText());
            await this.deletePost(element);
        }  
    }

    async openPostMenu(post:WebElement)
    {
        let locatorPostMenu = By.css("div[aria-label='Działania dla tego posta']");
        let postMenu = await post.findElement(locatorPostMenu);
        await this._driver.wait(until.elementIsVisible(postMenu));
        await postMenu.click();  
    }

    async deletePost(post:WebElement)
    {
        await this.openPostMenu(post);
        let locatorDeleteButton = By.xpath("//span[text()='Przenieś do kosza']");
        await clickElementWithLocator(locatorDeleteButton, this._driver, true);
        await this.confirmDelete();
    }

    async confirmDelete()
    {
        let locatorConfirm = By.xpath("//span[text()='Przenieś']");
        await clickElementWithLocator(locatorConfirm, this._driver, true);
    }

    private _driver:WebDriver;
    public static readonly Url = "https://www.facebook.com/";
}
