const http = require('http');

const fs = require('fs'); // module hệ thống tập tin (file system) của Node.js, cho phép làm việc với hệ thống tập tin
const path = require('path'); // module cung cấp các tiện ich để làm việc với đường dẫn tệp tin và thư mục

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((req, res) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end(`
//     <html>
//         <body>
//             <h1>Hello, World!</h1>
//         </body>
//     </html>
//     `);
// });

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') {
            fileUrl = '/index.html';
        } else {
            fileUrl = req.url;
        }

        var filePath = path.resolve('./public' + fileUrl); // path.resolve: chuyển đổi đường dẫn tương đối thành đường dẫn tuyệt đối
        const fileExt = path.extname(filePath); 
        /* 
        path.extname: trả về phần mở rộng của tệp bao gồm dấu chấm (`.`)
        Ví dụ: filePath = "D:\FPT UNIVERSITY\CN7\SDN301m\ExercisesPractice\NodeJS\node-http\public\index.html"
            thì fileExt = ".html"
        */
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`
                        <html>
                            <body>
                                <h1>Error 404: ${fileUrl} not found
                            </body>
                        </html>
                    `);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
                /*
                fs.createReadStream(filePath): tạo ra một Readable Stream từ tệp nằm tại filePath
                .pipe(res): chuyển dữ liệu từ Readable Stream sang Writable Stream (đầu vào của response để gửi đến client)
                */
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`
                <html>
                    <body>
                        <h1>Error 404: ${fileUrl} not found
                    </body>
                </html>
        `);
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});