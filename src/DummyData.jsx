const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

const fetchUserData = async () => {
  const { data } = await api.get("/protected/resource");
  return data;
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth(); // Your custom hook to manage auth state
  return allowedRoles.includes(user?.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
