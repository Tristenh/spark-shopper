export default function Features({feature}){
    return feature.split('\n').reduce(function (arr,line,i) {
      <div key={i}>
      return arr.concat(
       line,
        <br />
      );
      </div>
    },[]);
    
  }