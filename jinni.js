const fjob = require('./fJob');


class Jinni extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://djinni.co';
        
    }
    
    async search_link() {
        try {
            this.jinni_name = 'jinni';
            await this.page.goto(this.url);
            await this.page.getByRole('link', { name: 'Увійти' }).click();
            await this.page.getByPlaceholder('Email').fill('alexlove9596@gmail.com');
            await this.page.getByPlaceholder('Пароль').fill(process.env.password);
            //await this.page.getByLabel('Я кандидат - шукаю пропозиції').check();
            await this.page.getByRole('button', { name: 'Увійти', exact: true }).click();
            
            
            
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step()
        }
      
    }

    async second_step() {
        
        try {
            await this.page.locator('.nav-link').getByText('Вакансії').click();
            await this.page.waitForTimeout(3000);
            var data = {};
            var variant = await this.page.$$('.job-list-item__title');
            
            for(var m of variant) {
                try {
                    var link_work = await m.$eval('a.h3', el => el.getAttribute('href'));
                    var name_work = await m.$eval('a.h3', el => el.innerText);
                
                    data[name_work] = `https://www.djinni.co${link_work}`;
                } catch(err) {
                    } 
                }  
              
        } catch(err) {
            console.error(err)
        } finally {
            this.makeJSON(data, this.jinni_name)
        }
    }
}


module.exports = {
    Jinni
}