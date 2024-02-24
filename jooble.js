const fjob = require('./fJob');





class Jooble extends fjob.FindeJob {
    constructor() {
        super()
        this.url = 'https://ua.jooble.org/';
        
    }
    
    async search_link() {
        try {
            this.jooble_name = 'jooble';
            await this.page.goto(this.url);
            await this.page.getByPlaceholder('Ким ви хочете працювати?').fill('junior python');
            await this.page.locator('span').getByText('python').first().click();
            //await this.page3.getByPlaceholder('Місто').fill('Віддалено');
            await this.page.locator('span').getByText('Шукати').click();
            
        } catch(err) {
            console.error(err)
        } finally {
            this.second_step()
        }
      
    }

    async second_step() {
        //Всплывающее окно.
        await this.page.getByRole('button', { name: /закрити/i }).click();
        try {
            
            await this.page.locator('span').getByText('Дата публікації').click();
            await this.page.getByText('За останні 24 години').click();
            await this.page.getByRole('button', { name: /Приймаю/i }).click();
            await this.page.getByRole('button', { name: /Застосувати/i }).click();
            this.page_down(this.page)
            await this.page.waitForTimeout(6000);
            var variant = await this.page.$('.infinite-scroll-component');
            var data_ = await variant.$$eval('a', el => el.map( n => {
                        var data = {};
                        var l = n.getAttribute('href');
                        var nam = n.innerText; 
                        data[nam] = l;
                        return data;
                    })
                    
                    
                );
               
           
        } catch(err) {
            console.error(err)
        } finally {
            this.makeJSON(data_, this.jooble_name)
        }
    }
}


module.exports = {
    Jooble
}