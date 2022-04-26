import "./body.css";
import Post from '../Post/post.jsx';
import Pagination from '../pagination/pagination.jsx';
import { connect } from 'react-redux';
import { loadingON, loadingOFF } from '../../../actions/index.js';





function Body( {loading, posts, currentPosts, postsPerPage, paginate} ) {
console.log(loading)

  return (
    <div className="body">
      <Post posts={currentPosts} loading={loading} />
      {posts.length? (<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>) : null}
    </div>
  );

}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps, { loadingON, loadingOFF })(Body)
