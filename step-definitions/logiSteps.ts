import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../setup/pageFixture";
import LoginPage from "../page-objects/loginPage";
import { ExcelReader } from '../config/ExcelReader';
setDefaultTimeout(60 * 1000 * 2)
let loginPage: LoginPage;

ExcelReader.setFilePath('data/INNSERV.xlsx');


Given('user navigates to INNSERV application', async function () {
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.navigateToLMSPage();
    console.log("Navigated to the application")
})

When('login with valid credentials from excel {string}',async function (rowno) {
    const mobileno = ExcelReader.readCellValue('Login', 'MobileNumber', rowno);
     const pwd = ExcelReader.readCellValue('Login', 'Password', rowno);
     await loginPage.enterMobileNumber(mobileno);
     await loginPage.enterPassword(pwd);
    console.log('INFO:Username and password entered successfully')
    });
        
    When('click Login button',async function () {
    await loginPage.clickLoginBtn();
    console.log("INFO:Login button clicked successfully")
    });
    
    
    Then('verify home page is displayed',async function () {
    await loginPage.verifyHomePage();
    console.log("Home Page verified")
    });
    


