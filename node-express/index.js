const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev')); // sử dụng middleware 'morgan' với cấu hình 'dev' để ghi lại các log yêu cầu HTTP ở định dạng ngắn gọn, bao gồm thông tin như phương thức HTTP, URL, trạng thái, thời gian phản hồi và kích thước phản hổi.

// app.use((req, res, next) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     // res.write("Hello world");
//     res.end(`
//         <html>
//             <body>
//                 <h1>This is an Express Server</h1>
//             </body>
//         </html>
//     `);
// });

// app.use(express.static(__dirname + '/public'));
/*
sử dụng middleware 'express.static' để phục vụ các tệp tĩnh từ thư mục public trong thư mục hiện tại '__dirname"
*/
const routes = [
    {path: '/dishes', route: dishRouter},
    {path: '/promotions', route: promoRouter},
    {path: '/leaders', route: leaderRouter},
];

routes.forEach(routes => {
    app.use(routes.path, routes.route);
});

// app.use('/dishes', dishRouter);

// app.use(bodyParser.json());

// app.all('/dishes', (req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });

// app.get('/dishes', (req, res, next) => {
//     res.end('Will send all the dishes to you!');
// });

// app.post('/dishes', (req, res, next) => {
//     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });

// app.put('/dishes', (req, res, next) => {
//     res.statusCode = 200;
//     res.end('PUT operation is not supported on /dishes');
// });

// app.delete('/dishes', (req, res, next) => {
//     res.end('Deleting all dishes');
// });

// app.get('/dishes/:dishId', (req, res, next) => {
//     res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
// });

// app.post('dishes/:dishId', (req, res, next) => {
//     res.statusCode = 200;
//     res.end('POST operation is not supported on /dishes/' + req.params.dishId);
// });

// app.put('/dishes/:dishId', (req, res, next) => {
//     res.write('Updating the dish: ' + req.params.dishId + '\n');
//     res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});