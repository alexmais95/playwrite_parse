const fjob = require('./fJob');





class WorkUa extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://www.work.ua/';
        
    }
    
    async search_link() {
        
        try {
            this.workua_name = 'workua';
            this.w_page = await this.context.newPage();
            await this.w_page.goto(this.url);
            await this.w_page.getByPlaceholder('Посада або компанія').fill(this.position);
            await this.w_page.getByPlaceholder('Місто').click();
            
            await this.w_page.locator('.list-tips').getByText(this.format_sity).click();
            
            await this.w_page.locator('.btn#sm-but').click();
            
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step();
        }
      
    }
    async second_step(){
        try {
            await this.w_page.locator('.dropdown').getByText('за 30 днів, за датою').click();
            await this.w_page.locator('.days').getByText('За 1 день').click();
           
            var data = {};
            var variant = await this.w_page.$$('.card');
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