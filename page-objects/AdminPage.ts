import { expect, Page } from "@playwright/test";
import commonfunctions from "../commonFunction/commonFunction";

export default class AdminPage {

    private base: commonfunctions;

    constructor(private page: Page) {
        this.base = new commonfunctions(page);
    }

    private Elements = {
    createfloor:'//button[text()="Create Floor"]' ,
    floorname:'//input[@placeholder="Enter Floor Name"]',
    clickcreatefloor:'(//button[text()="Create Floor"])[2]',
    successmsgforfloor:'//div[text()="Floor successfully added!"]',
    clickroombtn:'(//div[(@class="z-20 text-inherit") and (text()="Room")])',
    createroombtn:'//button[text()="Create Room"]',
    enterfloorname:'//select[@class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"]',
    roomname:'//input[@placeholder="Enter Room Name"]',
    createroombtninpopup:'(//button[text()="Create Room"])[2]',
    successmsgforroom:'//div[text()="Room Added successfully"]',

    Administrator:'//p[text()="Administrator"]',
    userconfig:'//div[text()="User Config"]',
    createcustomer:'//button[text()="Create Customer"]',
    cusname:'//input[@placeholder="Enter Name"]',
    cusphnum:'//input[@placeholder="Enter Phone Number"]',
    cusroomnum:'//input[@placeholder="Enter Room Number"]',
    cususername:'//input[@placeholder="Enter Username"]',
    cuspassword:'//input[@placeholder="Enter Password"]',
    cussubmit:'//button[text()="Submit"]',
    successmsgforcreatecus:'//div[text()="Customer Created Successfully"]',
    serviceperson:'//div[text()="Service Person"]',
    receptionist:'//div[text()="Receptionist"]',
    }

    async createfloor(data){
  
        await this.base.clickOnWebElement(this.page, this.Elements.createfloor)
        await this.base.inputTextForWebElement(this.page,this.Elements.floorname,data)
        await this.base.clickOnWebElement(this.page,this.Elements.clickcreatefloor)
        await this.base.visibilityOfElement(this.page,this.Elements.successmsgforfloor)
        await this.page.waitForTimeout(1000);
        }
        
        async createroom(floorname,roomname){
          await this.page.waitForTimeout(2000);
        await this.base.clickOnWebElement(this.page,this.Elements.clickroombtn)
        await this.base.clickOnWebElement(this.page,this.Elements.createroombtn)
        await this.base.selectByDDText(this.page,this.Elements.enterfloorname,floorname)
        await this.base.inputTextForWebElement(this.page,this.Elements.roomname,roomname)
        await this.base.clickOnWebElement(this.page,this.Elements.createroombtninpopup)
        await this.base.visibilityOfElement(this.page,this.Elements.successmsgforroom)
        await this.page.waitForTimeout(2000);
        }
        
        
        
        async verifyadminandclickuserconfig(){
          await this.base.visibilityOfElement(this.page,this.Elements.Administrator)
          await this.base.clickOnWebElement(this.page,this.Elements.Administrator)
          await this.base.clickOnWebElement(this.page,this.Elements.userconfig)
        }
        
        async createcustomer(name,phno,rmno,urname,pwd){
          await this.base.clickOnWebElement(this.page,this.Elements.createcustomer)
          await this.base.inputTextForWebElement(this.page,this.Elements.cusname,name)
          await this.base.inputTextForWebElement(this.page,this.Elements.cusphnum,phno)
          await this.base.inputTextForWebElement(this.page,this.Elements.cusroomnum,rmno)
          await this.base.inputTextForWebElement(this.page,this.Elements.cususername,urname)
          await this.base.inputTextForWebElement(this.page,this.Elements.cuspassword,pwd)
          await this.base.clickOnWebElement(this.page,this.Elements.cussubmit)
          await this.base.visibilityOfElement(this.page,this.Elements.successmsgforcreatecus)
          await this.page.waitForTimeout(2000);
          
        }
        
        async navigatetoreceptionist(){
        await this.base.clickOnWebElement(this.page,this.Elements.serviceperson)
        await this.base.clickOnWebElement(this.page,this.Elements.receptionist)
        }
}
        
