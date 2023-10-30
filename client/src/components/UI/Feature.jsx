import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Feature({children=""}) {
    return children.split('\n').map(line => (
        <Fragment key={uuidv4()}>
          {line}
          <br />
        </Fragment>
      ))  }
