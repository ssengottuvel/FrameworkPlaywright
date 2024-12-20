import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext,chromium ,Page} from "@playwright/test";
import { pageFixture } from "./pageFixture";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let page:Page;

BeforeAll(async function () {
    browser = await chromium.launch({headless:false});
    page = await browser.newPage();
    pageFixture.page=page;
    
});
Before(async function () {
    context = await browser.newContext();
    page = await browser.newPage();
    pageFixture.page=page;
    
});

After(async function ({ pickle, result }) {
if(result?.status==Status.FAILED){
    const img = await pageFixture.page.screenshot( { path: `./report-cucumber/screenshots/${pickle.name}.png`, type: "png" })
    await this.attach(img, "image/png");
}

   
    await pageFixture.page.close();
    await context.close();
});


AfterAll(async function () {
    
    await browser.close();
})

function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin"))
        return "src/helper/auth/admin.json";
    else if (user.endsWith("lead"))
        return "src/helper/auth/lead.json";
}


