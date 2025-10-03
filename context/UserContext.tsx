// context/UserContext.tsx
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string; // ✅ added password
  role?: string;
  isActive?: boolean; // ✅ convert to boolean
};

type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  users: [],
  setUsers: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const db = useSQLiteContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = (await db.getAllAsync("SELECT * FROM users")) as any[];

        // Convert numeric flags (0/1) to booleans
        const formattedData: User[] = data.map((u) => ({
          ...u,
          isActive: Boolean(u.isActive),
        }));

        setUsers(formattedData || []);
      } catch (e) {
        console.error("Error fetching users:", e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  return (
    <UserContext.Provider value={{ users, setUsers, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
