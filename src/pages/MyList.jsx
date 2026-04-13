import './PageLayout.css';
import './MyList.css';

export default function MyList() {
  return (
    <div className="page-layout">
      <div className="page-header">
        <h1 className="page-title">My List</h1>
      </div>
      <div className="mylist-empty">
        <div className="mylist-icon">☆</div>
        <p>Your list is empty</p>
        <span>Add movies and shows to keep track of what you want to watch.</span>
      </div>
    </div>
  );
}
