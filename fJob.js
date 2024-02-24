require('dotenv').config()
const {chromium, firefox} = require('playwright')
const fs = require('fs')
const moment = require('moment')
const path = require('path');


class FindeJob {
    constructor(){
        this.now = new Date();
        this.dateString = moment(this.now).format('YYYY-MM-DD');
        this.position = 'Python-програміст';
        this.format_sity = 'Дистанційно';
        this.work_dir = path.resolve(__dirname);
    }

    async page_down(page) {
        await page.evaluate(()=>{
            const scroll_step = 200;
            const scroll_interval = 100;
            const scroll_height = document.documentElement.scrollHeight;
            let corent_position = 0;
    
            const interval = setInterval(() => {
                window.scrollBy(0, scroll_step);
                corent_position += scroll_step;
                if(corent_position >= scroll_height){
                    clearInterval(interval)
                }
            })
        })
        
    }
    
    async makeJSON(data, name) {
        
        data = JSON.stringify(data);
        let themes;
        try {
            fs.writeFile(`${this.work_dir}/list_job/${this.dateString}-${name}.json`, data, "utf8", async (err) => {
                if (err) console.error(err);
                else {
                    fs.readFile(`${this.work_dir}/list_job/${this.dateString}-${name}.json`, "utf8", (error, array) => {
                    themes = array
                    });
                }
            });
        } catch (err) {
            console.error(err);
            }
        if (themes) return themes;
    }
    
    async search_link() {}


    async start_search(){   
        this.browser = await chromium.launch({
            'headless':true
        }); 
        this.context = await this.browser.newContext(
            {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                geolocation: { longitude: 30.5238, latitude: 50.45466 },
                permissions: ['geolocation'],
                
            }
        );
        this.page = await this.context.newPage();
        this.search_link();
        await this.page.waitForTimeout(40000);
        await this.browser.close();
    }
}


module.exports = {
    FindeJob
}