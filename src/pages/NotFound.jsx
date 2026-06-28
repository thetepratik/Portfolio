import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <div className="page-404-number">404</div>
      <h1 className="page-404-title">Page Not Found</h1>
      <p className="page-404-text">The page you're looking for doesn't exist or has been moved.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>← Go Home</button>
    </div>
  );
}
