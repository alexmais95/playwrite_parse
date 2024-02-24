const fjob = require('./fJob');





class Dou extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://jobs.dou.ua/';
        
    }
    async search_link() {
        
        try {
            this.dou_name = 'DOU';
            await this.page.goto(this.url);
            await this.page.getByPlaceholder('Посада, мова, компанія, місто, країна.').fill('python');
            await this.page.locator('.btn-search').click();  
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step();
        }
      
    }

    async second_step() {
        try {
            var data = {};
            var variant = await this.page.$$('.title');
            for(var m of variant) {
                try {
                    var link_work = await m.$eval('a.vt', el => el.getAttribute('href'));
                    var name_work = await m.$eval('a.vt', el => el.innerText);
                
                    data[name_work] = link_work;
                } catch(err) {
                } 
            }   
                
        } catch(err) {
            console.error(err)
        } finally {
            this.makeJSON(data, this.dou_name)
        }
        
    }
}


module.exports = {
    Dou
}