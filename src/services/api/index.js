const API = process.env.NEXT_PUBLIC_API_URL;

const endPoinst = {
  auth: {
    login: `${API}/login`,
    signUp: `${API}/auth/signup`,
    profile: `${API}/auth/user`,
  },
  users: {
    api: `${API}/admin/users`,
  },
};

module.exports = endPoinst;
