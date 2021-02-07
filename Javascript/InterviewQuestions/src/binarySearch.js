module.exports = function binarySearch(arr, item, start, end, first){
  let size = end - start;
  if(start === end){
    return arr[start] === item ? start : -1;
  }
  if(start > end){
    return -1;
  }
  if(arr[start] > item || arr[end] < item){
    return -1
  }
  let mid = parseInt(size / 2) + start;
  if(arr[mid] > item){
    return binarySearch(arr, item, start, mid - 1, first);
  }else if(arr[mid] < item){
    return binarySearch(arr, item, mid + 1, end, first);
  }else{
    if(first === true){
      let po = binarySearch(arr, item, start, mid - 1, first);
      return po == -1? mid : po;
    }else if(first === false){
      let po = binarySearch(arr, item, mid + 1, end, first);
      return po == -1? mid : po;
    }else{
      return mid;
    }

  }
}