const work_ua = require('./workua');
const joob_le = require('./jooble');


var workua = new work_ua.WorkUa();
var jooble = new joob_le.Jooble();


async function main() {
    await workua.start_search();
    await jooble.start_search();
};

main()