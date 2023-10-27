import React from 'react';
export default function Features({feature}){
    return feature.split('\n').reduce(function (arr,line,i) {
      <React.Fragment key={i}>
      return arr.concat(
       line,
        <br />
      );
    </React.Fragment>

    },[]);
  }