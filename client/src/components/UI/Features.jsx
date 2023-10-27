export default function Features({feature}){
    return feature.split('\n').reduce(function (arr,line) {
      return arr.concat(
       line,
        <br />
      );
    },[]);
  }