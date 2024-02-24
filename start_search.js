const work_ua = require('./workua');
const joob_le = require('./jooble');
const dou_w = require('./DOU');
const jin = require('./jinni');
const flo_f = require('./floof');


var workua = new work_ua.WorkUa();
var jooble = new joob_le.Jooble();
var dou = new dou_w.Dou();
var jinni = new jin.Jinni();
var floof = new flo_f.Floof();


async function main() {
    //await workua.start_search();
    //await jooble.start_search();
    //await dou.start_search();
    await jinni.start_search();
    //await floof.start_search();
};

main()