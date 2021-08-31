const http = require('./app');
const port = 8080;
require('./socket');
// 얘만 http로 바꿔주면 된다.
http.listen(port, () => {
    console.log('listening: ' + port);
});
