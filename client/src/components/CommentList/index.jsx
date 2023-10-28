// import { useStoreContext } from "../utils/GlobalState";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useQuery} from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";

import { QUERY_PRODUCT } from "../../utils/queries";
const CommentList = () => {
  const { id } = useParams();

  // const { loading, data } = useQuery(QUERY_PRODUCT, {
  //   // pass URL parameter
  //   variables: { productId: id },
  // });

  // const product = data?.product || {};
  const [state, dispatch] = useStoreContext();
  const [getProductById, { loading }] = useLazyQuery(QUERY_PRODUCT);
  useEffect(() => {
    // already in global store
    // if (productId) {
      // getProductById({
      //   variables: {
      //     productId:id,
      //   },
      // }).then(({product}) => {
      //   console.log(product);
      // });
    // }
    // if (!comments.length) {
    //   return <h3>No Comments Yet</h3>;
    // }
  }, [getProductById,id]);

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {/* {product.comments &&
          product.comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.userName} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.dateCreated}
                  </span>
                </h5>
                <p className="card-body">{comment.commentDesc}</p>
              </div>
            </div>
          ))} */}
      </div>
    </>
  );
};

export default CommentList;
