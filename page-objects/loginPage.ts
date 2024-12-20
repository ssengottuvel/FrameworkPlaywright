import { expect, Page } from "@playwright/test";
import commonfunctions from "../commonFunction/commonFunction";


export default class loginPage {

    private base: commonfunctions;
   

    constructor(private page: Page) {
        this.base = new commonfunctions(page);
    }

    private Elements = {
        username:' //input[@placeholder="Enter your username"]',
        password:'//input[@placeholder="Enter your password"]',
        signinBtn:'//button[@type="submit"]',
        dashboard:'//div[@class="mb-2 p-4 w-full flex items-center justify-center"]'
    }

    async navigateToLMSPage() {
        await this.base.goto("https://www.hotel.annulartech.net")
    }
    async enterMobileNumber(data) {    
        await this.base.inputTextForWebElement(this.page,this.Elements.username, data);
      }
    
      async enterPassword(data) {
        await this.base.inputTextForWebElement(this.page,this.Elements.password, data);
      }
    
      async clickLoginBtn() {
        await this.base.waitForparticularElementVisible(this.page,this.Elements.signinBtn)
        await this.base.clickOnWebElement(this.page, this.Elements.signinBtn);
        
      }
      async verifyHomePage() {
        await this.base.visibility(this.page, this.Elements.dashboard);
        
      }
}
