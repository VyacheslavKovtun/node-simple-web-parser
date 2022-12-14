import express from "express";
import path from "path";
import {getAuthorProfileData} from './services/parse-service.js';

//initialize constants, port and the application 
const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

//initialize visual part files settings
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'static')));

const tutorsIds = [
    'O-ye53MAAAAJ',
    'n9U6DnwAAAAJ',
    'i5B7-AMAAAAJ',
    'CJE3f3cAAAAJ',
    'UwPyXzPhIO8C',
    'zf5-TQ8AAAAJ',
    'WsH6aBMAAAAJ',
    '5s2GHH0AAAAJ',
    'MwjiPGcAAAAJ',
    'zuJPNg0AAAAJ',
    'elLkeqwAAAAJ',
    'jjUVaiAAAAAJ',
    'KK5y_98AAAAJ',
    'L4OVvKMAAAAJ',
    'Aqq63hMAAAAJ',
    'W4iOlHQAAAAJ',
    'TBZEk-UAAAAJ',
    'XXjwC_8AAAAJ'
];

var authorsInfo = [];

//filling the authorsInfo array
tutorsIds.forEach(async id => {
    let info = await getAuthorProfileData(id); 
    authorsInfo.push(info);
});

//set the index file and dynamic variables
app.get('/', (req, res) => {
    res.render('index', {authorsInfo: authorsInfo});
});

//starting the application
app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});