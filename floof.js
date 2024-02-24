const fjob = require('./fJob');





class Floof extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://nofluffjobs.com/ua';
        
    }
    
    async search_link() {
        try {
            this.floof_name = 'floof';
            await this.page.goto(this.url);
            await this.page.getByRole('button', { name: 'Accept', exact: true }).click();
            await this.page.locator('.mat-chip-list-wrapper').click();
            await this.page.locator('#mat-chip-list-input-0').fill('python');
            await this.page.waitForTimeout(2000);
            await this.page.getByRole('button', { name: 'Знайти вакансiї' }).click();
            
            
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step()
        }
      
    }

    async second_step() {
        
        try {
            await this.page.waitForTimeout(3000);
            
            var data = {};
            var variant = await this.page.$$('.list-container a');
            
            for(var m of variant) {
                
                try {
                    var link_work = await m.getAttribute('href');
                    var name_work = await m.$eval('h3', el=> el.innerText);
                    data[name_work] = `https://www.nofluffjobs.com${link_work}`;
                } catch(err) {
                    } 
            }  
           
           
        } catch(err) {
            console.error(err)
        } finally {
            this.makeJSON(data, this.floof_name)
        }
    }
}


module.exports = {
    Floof
}