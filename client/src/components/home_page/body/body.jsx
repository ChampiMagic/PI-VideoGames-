import s from "./body.module.css";
import Post from '../Post/post.jsx';
import Pagination from '../pagination/pagination.jsx';
import { connect } from 'react-redux';
import { loadingON, loadingOFF } from '../../../actions/index.js';





function Body( {loading, posts, currentPosts, postsPerPage, paginate, page} ) {


  return (
    <div className={s.body}>
      <Post posts={currentPosts} loading={loading} />
      {posts.length && !loading? (<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} page={page}/>) : null}
    </div>
  );

}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { loadingON, loadingOFF })(Body)
