(function minimumSwaps(arr) {
    let q = arr;
    let count = 0;
   function swap(index, diff){

        q[index+diff] = q[index] + q[index + diff];
        q[index] = q[index+diff] - q[index];
        q[index+diff] = q[index+diff]-q[index];
        count++;
   }
   let i = 0, size = q.length;
   while( i <size){
       let diff = q[i] - 1 - i;
       if(diff != 0){
         swap(i , diff);
         i=0;
       }else{
          i++;
       }
   }
   return count;
})([4, 3, 1, 2]);
