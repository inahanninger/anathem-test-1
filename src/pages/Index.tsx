
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/report");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-clinical-neutral/50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading Clinical Review</h1>
        <p className="text-xl text-gray-600">Please wait...</p>
      </div>
    </div>
  );
};

export default Index;
