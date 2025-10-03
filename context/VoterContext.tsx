// context/VoterContext.tsx
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Voter = {
  id: number;
  name: string;
  email?: string;
  serial: string;
  voter_id: string;
  mobile?: string;
  updated?: number;
  voted?: number;
  party?: string;
  business?: string;
  caste?: string;
  VIP?: boolean; // ✅ convert to boolean
  dead?: boolean; // ✅ convert to boolean
  migrated?: boolean; // ✅ convert to boolean
  migrate_address?: string;
  migrate_contact?: string;
  migrate_email?: string;
  migrate_district?: string;
  comment?: string;
  migrate_resp_person?: string;
  migrate_resp_person_number?: string;
};

type VoterContextType = {
  voters: Voter[];
  setVoters: React.Dispatch<React.SetStateAction<Voter[]>>;
  loading: boolean;
};

const VoterContext = createContext<VoterContextType>({
  voters: [],
  setVoters: () => {},
  loading: true,
});

export const VoterProvider = ({ children }: { children: React.ReactNode }) => {
  const db = useSQLiteContext();
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const data = (await db.getAllAsync("SELECT * FROM voter_list")) as any[];

        // Convert numeric flags (0/1) to booleans
        const formattedData: Voter[] = data.map((v) => ({
          ...v,
          VIP: Boolean(v.VIP),
          dead: Boolean(v.dead),
          migrated: Boolean(v.migrated),
        }));

        setVoters(formattedData || []);
      } catch (e) {
        console.error("Error fetching voters:", e);
        setVoters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, [db]);

  return (
    <VoterContext.Provider value={{ voters, setVoters, loading }}>
      {children}
    </VoterContext.Provider>
  );
};

export const useVoters = () => useContext(VoterContext);
