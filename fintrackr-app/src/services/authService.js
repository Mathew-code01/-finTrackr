// src/services/authService.js

// src/services/authService.js

// src/services/authService.js

// Keys for localStorage
// src/services/authService.js
// src/services/authService.js

const USERS_KEY = "fintrackr_users";
const SESSION_KEY = "fintrackr_user"; // ✅ our single source of truth

// 🔄 Migration helper for old session
function migrateOldSession() {
  const oldSession = localStorage.getItem("fintrackr_session");
  if (oldSession && !localStorage.getItem(SESSION_KEY)) {
    localStorage.setItem(SESSION_KEY, oldSession);
    localStorage.removeItem("fintrackr_session");
  }
}

// 🔄 Migration helper for old users with uppercase emails
function migrateOldUsers() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  let changed = false;

  const normalizedUsers = users.map((u) => {
    const normalizedEmail = u.email.trim().toLowerCase();
    if (u.email !== normalizedEmail) {
      changed = true;
      return { ...u, email: normalizedEmail };
    }
    return u;
  });

  if (changed) {
    localStorage.setItem(USERS_KEY, JSON.stringify(normalizedUsers));
  }
}

export const authService = {
  register: async ({ name, email, password }) => {
    migrateOldSession();
    migrateOldUsers();

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now(),
      name,
      email: normalizedEmail,
      password,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    // also log them in
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  },

  login: async ({ email, password }) => {
    migrateOldSession();
    migrateOldUsers();

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(
      (u) => u.email === normalizedEmail && u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: () => {
    migrateOldSession();
    migrateOldUsers();
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  },

  getAllUsers: () => {
    migrateOldUsers();
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  },
};
