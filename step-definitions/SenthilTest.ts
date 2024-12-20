import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../setup/pageFixture";
import LoginPage from "../page-objects/loginPage";
import SenthilPage from "../page-objects/SenthilTestPage"
import { ExcelReader } from '../config/ExcelReader';


setDefaultTimeout(60 * 1000 * 2)
let senthilPage: SenthilPage;

ExcelReader.setFilePath('data/INNSERV.xlsx');


Given('user navigates to WS application', async function () {
    senthilPage = new SenthilPage(pageFixture.page);
    await senthilPage.navigateToLMSPage();
    console.log("Navigated to the application")
})

Then('enter emailaddress password and click login button', async function () {
   await senthilPage.enterEmailPassAndLogin();
   console.log("Logged into the application")
})