// app/_layout.tsx or RootLayout.tsx
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";
import "../global.css"; // for Expo Router (_layout.tsx)

import { UserProvider } from "@/context/UserContext";
import { VoterProvider } from "@/context/VoterContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Migration function to create voter_list and user table
async function migrateDbIfNeeded(db: SQLiteDatabase) {
  // --- Voter List Table ---
  await db.execAsync(`DROP TABLE IF EXISTS voter_list;`);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS voter_list (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      serial TEXT NOT NULL,
      voter_id TEXT NOT NULL,
      mobile TEXT,
      updated INTEGER DEFAULT 0,
      voted INTEGER DEFAULT 0,
      party TEXT
    );
  `);

  // Add new voter columns if missing
  const voterColumns = [
    { name: "business", type: "TEXT" },
    { name: "caste", type: "TEXT" },
    { name: "VIP", type: "INTEGER", default: 0 },
    { name: "dead", type: "INTEGER", default: 0 },
    { name: "migrated", type: "INTEGER", default: 0 },
    { name: "migrate_address", type: "TEXT" },
    { name: "migrate_contact", type: "TEXT" },
    { name: "migrate_email", type: "TEXT" },
    { name: "migrate_district", type: "TEXT" },
    { name: "comment", type: "TEXT" },
    { name: "migrate_resp_person", type: "TEXT" },
    { name: "migrate_resp_person_number", type: "TEXT" },
  ];

  for (const col of voterColumns) {
    try {
      await db.execAsync(
        `ALTER TABLE voter_list ADD COLUMN ${col.name} ${col.type} ${
          col.default !== undefined ? `DEFAULT ${col.default}` : ""
        };`
      );
    } catch (e) {
      // ignore if column exists
    }
  }

  // Insert dummy voters if table empty
  const voterCount = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM voter_list`
  );
  if (voterCount?.count === 0) {
    const dummyVoters = [
      { name: "Aarav Sharma", email: "aarav.sharma@example.com", serial: "001", voter_id: "V10001", mobile: "9876543210", business: "Engineer", caste: "General", VIP: 0 },
      { name: "Ishita Gupta", email: "ishita.gupta@example.com", serial: "002", voter_id: "V10002", mobile: "9876543211", business: "Teacher", caste: "OBC", VIP: 0 },
      { name: "Rohan Mehta", email: "rohan.mehta@example.com", serial: "003", voter_id: "V10003", mobile: "9876543212", business: "Shopkeeper", caste: "SC", VIP: 0 },
      { name: "Priya Singh", email: "priya.singh@example.com", serial: "004", voter_id: "V10004", mobile: "9876543213", business: "Farmer", caste: "ST", VIP: 0 },
      { name: "Vivaan Kapoor", email: "vivaan.kapoor@example.com", serial: "005", voter_id: "V10005", mobile: "9876543214", business: "Engineer", caste: "General", VIP: 1 },
      { name: "Ananya Reddy", email: "ananya.reddy@example.com", serial: "006", voter_id: "V10006", mobile: "9876543215", business: "Other", caste: "OBC", VIP: 0 },
      { name: "Kabir Patel", email: "kabir.patel@example.com", serial: "007", voter_id: "V10007", mobile: "9876543216", business: "Engineer", caste: "General", VIP: 0 },
      { name: "Saanvi Nair", email: "saanvi.nair@example.com", serial: "008", voter_id: "V10008", mobile: "9876543217", business: "Teacher", caste: "ST", VIP: 0 },
      { name: "Aditya Desai", email: "aditya.desai@example.com", serial: "009", voter_id: "V10009", mobile: "9876543218", business: "Shopkeeper", caste: "SC", VIP: 0 },
      { name: "Meera Joshi", email: "meera.joshi@example.com", serial: "010", voter_id: "V10010", mobile: "9876543219", business: "Farmer", caste: "OBC", VIP: 1 },
      { name: "Devansh Chawla", email: "devansh.chawla@example.com", serial: "011", voter_id: "V10011", mobile: "9876543220", business: "Engineer", caste: "General", VIP: 0 },
      { name: "Tara Bhatia", email: "tara.bhatia@example.com", serial: "012", voter_id: "V10012", mobile: "9876543221", business: "Teacher", caste: "Other", VIP: 0 },
      { name: "Arjun Verma", email: "arjun.verma@example.com", serial: "013", voter_id: "V10013", mobile: "9876543222", business: "Shopkeeper", caste: "SC", VIP: 0 },
      { name: "Nisha Kulkarni", email: "nisha.kulkarni@example.com", serial: "014", voter_id: "V10014", mobile: "9876543223", business: "Farmer", caste: "ST", VIP: 0 },
      { name: "Yash Raj", email: "yash.raj@example.com", serial: "015", voter_id: "V10015", mobile: "9876543224", business: "Engineer", caste: "General", VIP: 1 },
    ];
    

    for (const v of dummyVoters) {
      await db.runAsync(
        `INSERT INTO voter_list 
          (name, email, serial, voter_id, mobile, voted, party, business, caste, VIP, dead, migrated, migrate_address, migrate_contact, migrate_email, migrate_district, comment, migrate_resp_person, migrate_resp_person_number)
         VALUES (?, ?, ?, ?, ?, 0, '', ?, ?, ?, 0, 0, '', '', '', '', '', '', '')`,
        [v.name, v.email, v.serial, v.voter_id, v.mobile, v.business, v.caste, v.VIP]
      );
    }
  }

  // --- User Table ---
  await db.execAsync(`DROP TABLE IF EXISTS users;`);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      isActive INTEGER DEFAULT 1
    );
  `);

  const userCount = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM users`
  );
  if (userCount?.count === 0) {
    const dummyUsers = [
      { name: "Admin User", email: "admin@example.com", username: "admin", password: "admin123", role: "admin", isActive: 1 },
      { name: "Fewbe", email: "fewbe@example.com", username: "fewbe", password: "fewbe123", role: "user", isActive: 1 },
    ];

    for (const u of dummyUsers) {
      await db.runAsync(
        `INSERT INTO users (name, email, username, password, role, isActive) VALUES (?, ?, ?, ?, ?, ?)`,
        [u.name, u.email, u.username, u.password, u.role, u.isActive]
      );
    }
  }

  await db.execAsync(`PRAGMA user_version = 3;`);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <SQLiteProvider databaseName="test1.db" onInit={migrateDbIfNeeded}>
        <VoterProvider>
          <UserProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="modal" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="voter-list" />
              <Stack.Screen name="editVoter" />
              <Stack.Screen name="votes-screen" />
              <Stack.Screen name="promotional-material" />
              <Stack.Screen name="phone-diary" />
              <Stack.Screen name="chat-screen" />
              <Stack.Screen name="send-email-screen" />
              <Stack.Screen name="booth-system-screen" />
              <Stack.Screen name="war-room-screen" />
              <Stack.Screen name="votes-stats-screen" />
              <Stack.Screen name="test-screen" />
            </Stack>
            <StatusBar style="auto" />
          </UserProvider>
        </VoterProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
