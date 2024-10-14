import React, { useEffect } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import Routes from './common/routes';
import { migrateDbIfNeeded } from './common/services/db/Migration';

export default function App() {
  return (
    <SQLiteProvider databaseName="store.db" onInit={migrateDbIfNeeded}>
      <Routes />
    </SQLiteProvider>
  );
}