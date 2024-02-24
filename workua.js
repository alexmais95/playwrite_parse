const fjob = require('./fJob');





class WorkUa extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://www.work.ua/';
        
    }
    
    async search_link() {
        
        try {
            this.workua_name = 'workua';
            await this.page.goto(this.url);
            await this.page.getByPlaceholder('Посада або компанія').fill(this.position);
            await this.page.getByPlaceholder('Місто').click();
            
            await this.page.locator('.list-tips').getByText(this.format_sity).click();
            
            await this.page.locator('.btn#sm-but').click();
            
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step();
        }
      
    }
    async second_step(){
        try {
            await this.page.locator('.dropdown').getByText('за 30 днів, за датою').click();
            await this.page.locator('.days').getByText('За 1 день').click();
           
            var data = {};
            var variant = await this.page.$$('.card');
            for(var m of variant) {
                try {
                    var link_work = await m.$eval('.cut-top a', el => el.getAttribute('href'));
                    var name_work = await m.$eval('.cut-top a', el => el.getAttribute('title'));
                
                    data[name_work] = `https://www.work.ua${link_work}`;
                } catch(err) {
                    } 
                }   
            
        } catch(err){
            } finally{ this.makeJSON(data, this.workua_name)}   
        
    }
}


module.exports = {
    WorkUa
}