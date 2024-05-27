import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <container>
      <div className="title">
        <h1> Make your own To-Do Lists!</h1>
      </div>
      <div className="links">
        <Button variant="outline-primary">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Log In
          </Link>
        </Button>
      </div>
    </container>
  );
}
export default HomePage;
