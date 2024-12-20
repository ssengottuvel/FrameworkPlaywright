import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import AdminPage from "../page-objects/AdminPage";
import { pageFixture } from "../setup/pageFixture";

import { ExcelReader } from '../config/ExcelReader';
setDefaultTimeout(60 * 1000 * 2)
let adminPage: AdminPage;

ExcelReader.setFilePath('data/INNSERV.xlsx');



Then('create new floor {string}',async function (rowno) {
    const floorname = ExcelReader.readCellValue('Data', 'FloorName', rowno);
    await adminPage.createfloor(floorname);
    console.log("INFO:Floor Name Created")
    
});
Then('create new floor and verify success message {string}', async function (rowno) {
    const floorname = ExcelReader.readCellValue('Data', 'FloorName', rowno);
    await adminPage.createfloor(floorname);
    console.log("INFO:Floor Name Created")
  });


Then('create new Room and verify success message {string}',async function (rowno) {
    const floorname =ExcelReader.readCellValue('Data','FloorName',rowno)
    const roomname = ExcelReader.readCellValue('Data','RoomName',rowno)
    await adminPage.createroom(floorname,roomname)
});

Then('verify Administrator and click User Config',async function () {
    await adminPage.verifyadminandclickuserconfig()
});


Then('create new customer {string}',async function (rowno) {
    const name=ExcelReader.readCellValue('Customer','Name',rowno)
    const phno=ExcelReader.readCellValue('Customer','PhoneNo',rowno)
    const rmno=ExcelReader.readCellValue('Customer','RoomNo',rowno)
    const urname=ExcelReader.readCellValue('Customer','Username',rowno)
    const pwd=ExcelReader.readCellValue('Customer','Password',rowno)
    await adminPage.createcustomer(name,phno,rmno,urname,pwd)
});


Then('Navigate to Receptionist',async function () {
    
    await adminPage.navigatetoreceptionist()
});