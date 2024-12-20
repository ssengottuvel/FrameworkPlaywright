import { Page } from "@playwright/test";

export default class commonFunctions {

    constructor(private page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }
    async clickOnWebElement(page, locator) {
  
        await page.locator(`${locator}`).waitFor({
          state: 'visible',
          timeout: 8000, // Set your desired timeout in milliseconds
          
      });
      
       await page.locator(`${locator}`).click();
      
        
      
        }
        
        async findElement(page, selector) {
          await page.$(selector);
        }
        
        async pressBackspace(page) {
          await page.keyboard.press('Backspace');
        }
        async  waitForparticularElementVisible(page, selector, timeout = 60000) { 
            try {
                await page.waitForSelector(selector, { 
                    state: 'visible', 
                    timeout: timeout 
                });
            } catch (error) {
                // console.log("Some error: " + error.message);
                throw new Error(`Element with selector "${selector}" was not visible within ${timeout} milliseconds: ${error.message}`);
            }
          }
        
        
    
        //fill current Date
        async FillcurrentDate(page,locator) {
          const date = new Date();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          const day = String(date.getDate()).padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${year}-${month}-${day}`;
          await page.locator(`${locator}`).fill(formattedDate);
        }
        
        //Filling input to the element
        async inputTextForWebElement(page,locator, inputText) {
          inputText = inputText.toString();
          try {
            console.log(inputText);
            await page.locator(`${locator}`).fill(inputText);
            console.log(`Filled element '${locator}' with value: '${inputText}'`);
        } catch (error) {
            console.error(`Error filling element '${locator}' with value: '${inputText}'`, error);
            throw error; // Propagate the error to handle it in the calling function
        }
        
          //  // console.log(`Onto method :: inputTextForWebElement`)
        //   await page.locator(`${locator}`).fill(inputText)
        }
        
        async fillData(page,locator, inputText){
          await page.fill(locator, inputText);
        }
        
        //checking the visibility of the element
        async visibility(page, locator) {
          // await page.waitForLoadState('networkidle');
          // await page.waitForSelector(locator,{ state: 'visible', timeout: 1000 });
      
          const isVisible = await page.locator(locator).isVisible();
          console.log(`Element visibility status: ${isVisible}`);
          return isVisible
        }
      
      
        async visibilityOfElement(page, locator, timeout = 1000) {
          try {
              await page.waitForSelector(locator, { timeout, state: 'visible' });
              return true; // Element is visible
          } catch (error) {
              console.log(`Element not visible or not found: ${locator}`, error);
              throw error; 
              // return false; // Element is not visible or timed out
          }
      }
        // async visibilityOfElement(page, locator, timeout = 10000){
        //   await page.waitForSelector(locator, { timeout, state: 'visible' });
        //   return await page.locator(locator).isVisible();
        // }
      
       async checkVisibilityByRole(page, roleName, name) {
        try{
          // const link = await page.waitForSelector(`[role=${roleName}][name="${name}"]`);
        const link = await page.getByRole(roleName, { name });
        const isVisible = await link.isVisible();
        
        if (isVisible) {
            console.log(`${roleName} with name "${name}" is visible`);
        } else {
           console.log(`${roleName} with name "${name}" is not visible`);
        }
      } catch (error) {
        console.error(`Error checking visibility of ${roleName} with name "${name}":`, error);
        throw error; // Rethrow the error to propagate it further if needed
      }
      }
      
      
      async clickIfVisibleByRole(page, roleName, name) {
        try {
          const link = await page.getByRole(roleName, { name });
          const isVisible = await link.isVisible();
          console.log('welcome to error')
          console.log(link)
          console.log(isVisible)
          
          if (isVisible) {
            await link.click();
            console.log(`Clicked on ${roleName} with name "${name}"`);
          } else {
            console.log(`${roleName} with name "${name}" is not visible`);
          }
        } catch (error) {
          console.error(`Error clicking on ${roleName} with name "${name}":`, error);
        }
      }
      
      // async clickIfVisibleByRole(page, roleName, name) {
      //   const link = await page.getByRole(roleName, { name });
      //   const isVisible = await link.isVisible();
        
        
      //   if (isVisible) {
      //       await link.click();
      //     //  console.log(`Clicked on ${roleName} with name "${name}"`);
      //   } else {
      //       //console.log(`${roleName} with name "${name}" is not visible`);
      //   }
      // }
      
        //select an option in Drop down 1 using value
        async selectByValue(page,locator, value) {
        //  console.log(`Onto method::selectByValue `)
          await page.locator(`${locator}`).selectOption(value)
        }
      
        async selectByDDText(page,locator, data) {
          // Wait for the selector to appear on the page
          // await page.waitForSelector(locator);
          data= data.toString();
          console.log('locator is:', locator)
          
          console.log('Data:', data);
          console.log('Type of data:', typeof data);
        
          if (typeof data !== 'string') {
            throw new Error(`Expected a string for the label, but got ${typeof data}`);
          }
        
          // Select the option by label
          await page.selectOption(locator, { label: data });
        }
        // async selectByDDText(locator, data){
        //   await page.waitForSelector(locator, data)
        //   await page.selectOption(locator, {label: data})
        //   console.log('prathap.....')
        //   console.log(data)
        //   //await page.selectByText()
        // }
      
        async waitForElement(page, selector) {
          await page.waitForSelector(selector);
        }
      
        //select an option in Drop down 2 using index
        async selectByIndex(page,locator, index_value) {
        //  console.log(`Onto method::selectByIndex `)
          await page.locator(`${locator}`).selectOption({ index: index_value })
        }
      
        //click using text
        async clickElementByText(page, text) {
          await page.click(`text=${text}`);
        }
      
        //to select an option in checkbox or radio buttons
        async clickCheckbox(page, locator) {
         // console.log(`Onto method:: clickCheckbox`)
          await page.locator(`${locator}`).check()
        }
      
        //doubleclicking an element
        async doubleclickElement(page,locator) {
         // console.log(`Onto method::doubleclickElement`)
          await page.dblclick(`${locator}`)
        }
      
        async pressSpaceTwice(page) {
          await page.keyboard.press('Space');
          await page.keyboard.press('Space');
        }
      
        //get text of that element
        async getTextOfElement(page, locator) {
          console.log('console....')
          return await page.locator(`${locator}`).textContent()
        }
      
}
