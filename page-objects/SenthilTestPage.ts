import { expect, Page } from "@playwright/test";
import commonfunctions from "../commonFunction/commonFunction";

export default class SenthilTestPage {

    private base: commonfunctions;
    constructor(private page: Page) {
        this.base = new commonfunctions(page);
    }

    private Elements = {
        otherAccountLink: '//button[@id="otherTileText"]',
        emailTextBox: '//input[@type="email"]',
        nesteBtn: '//input[@type="submit"]',
        passwordTextBox: '//input[@type="password"]',
        logginBtn: '//input[@type="submit"]',
        leftMenuBtn: '//button[@test-id="visvenstremeny-btn"]',
        burgerMenuBtn: '//button[@test-id="bruker-meny-btn"]',
        burgerMenuLogoutBtn: '//button[@test-id="bruker-meny-logout-btn"]',
        buttonLogoutConfirmYes: '//button[@id="mat-mdc-dialog-0"]/div/div/ng-component/mat-dialog-actions/button[2]'
    }

    async navigateToLMSPage() {
       await this.base.goto( "https://test01.acoscloud.no/saksbehandling/")
       //await this.base.goto( global.APP_URL_WS);
    }

    async enterEmailPassAndLogin() {    
        await this.base.inputTextForWebElement(this.page,this.Elements.emailTextBox, "testcomplete4@acosdemo.onmicrosoft.com");
        await this.base.clickOnWebElement(this.page,this.Elements.nesteBtn);
        await this.base.inputTextForWebElement(this.page,this.Elements.passwordTextBox, "Jad91700");
        await this.base.clickOnWebElement(this.page,this.Elements.logginBtn);
        await this.base.clickOnWebElement(this.page,this.Elements.nesteBtn);
      }

}

