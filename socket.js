const http = require('./app');
const socketIo = require('socket.io');
const io = socketIo(http);

const initSocket = (socket, cntByGoods) => {
    return {
        watchBuying: () => {
            socket.on('BUY', (data) => {
                const payload = {
                    nickname: data.nickname,
                    goodsId: data.goodsId,
                    goodsName: data.goodsName,
                    date: new Date().toISOString(), // 보기 쉬운 문자열로 바꾸기
                };

                // io.emit('BUY_GOODS', payload); // io는 모든 소켓 관리자라고 하자
                // socket.emit('BUY_GOODS', payload); 나에게만 보내기
                socket.broadcast.emit('BUY_GOODS', payload); // 나를 제외한 모두에게
            });
        },
        watchChangePage: () => {
            socket.on('CHANGED_PAGE', (data) => {
                const goodsId = data.split('?goodsId=')[1];
                cntByGoods[socket.id] = goodsId;
                let cnt = 0;
                for (var key in cntByGoods) {
                    if (cntByGoods[key] == goodsId) cnt++;
                }

                io.emit('SAME_PAGE_VIEWER_COUNT', cnt);
            });
        },

        watchDisconnecting: () => {
            socket.on('disconnect', () => {
                console.log(cntByGoods);
                if (socket.id in cntByGoods) {
                    delete cntByGoods[socket.id];
                }
                console.log('소켓 연결이 해제되었습니다.');
            });
        },
    };
};
let cntByGoods = {};
io.on('connection', (socket) => {
    const { watchBuying, watchDisconnecting, watchChangePage } =
        initSocket(socket, cntByGoods);
    console.log('소켓 연결 성공');
    watchBuying();
    watchChangePage();
    watchDisconnecting();
});
