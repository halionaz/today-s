
// 구현 쉽지 않네

const serviceKey = `3UGtVGK5YBQl7uvBFfwhqhCj0SixVvmtZCoSH3Prb19cBGcfGqC3RsyxfzzGnE%2FR3aw6GF%2Bjo560qqYnhkqwTA%3D%3D`;

//시발 개같은 CORS 정책 위반 ㅅㅂㅅㅂㅅㅂㅅㅂ

function getDust(coords){
    let whatFor = 'getMsrstnAcctoRltmMesureDnsty';
    let location = '서초구'
    const dustDataLink = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/${whatFor}?stationName=${location}&dataTerm=daily&pageNo=1&numOfRows=100&returnType=json&serviceKey=${serviceKey}`;
    // $.getJSON(dustDataLink,data => {
    //     console.log(data);
    // });
}

getDust();