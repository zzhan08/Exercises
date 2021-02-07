
function realCal(q){
  var ans = 0;
    for (var i = q.length - 1; i >= 0; i--) {
        if (q[i] - (i + 1) > 2) {
          ans = -1
          return;
        }
        console.log("==============="+i+"==================");
        for (var j = Math.max(0, q[i] - 2); j < i; j++){
          console.log("j",j);
          if (q[j] > q[i]) {ans++;console.log("plus 1");}

        }
    }
    if (ans === -1) {
      console.log("Too charic");
    }else{
      console.log(ans);
    }
}
realCal([1, 2, 5, 3, 7, 8, 6, 4]);
/*2,1,5,3,4  |12534| 12354| 12345
 *2,1,5,4,3  |12543| 12534| 12354| 12345
1 2 5 3 7 8 6 4 |12357864|
2,5,1,3,4*/