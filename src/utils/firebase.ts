import { getApp as _getApp, getApps, initializeApp } from "firebase/app"
import {
  getFirestore as _getFirestore,
  enableIndexedDbPersistence,
} from "firebase/firestore"

const config = {
  apiKey: "AIzaSyDWl4luXyraFeVBxBM7AeiZXCKJRUWCdts",
  authDomain: "mcagilepoker.firebaseapp.com",
  projectId: "mcagilepoker",
  storageBucket: "mcagilepoker.appspot.com",
  messagingSenderId: "87929214533",
  appId: "1:87929214533:web:10ec620a643eeba6ee752c",
  measurementId: "G-P6L13WER2P",
}

const firebaseIsRunning = () => !!getApps().length

export function getApp() {
  if (!firebaseIsRunning()) initializeApp(config)

  return _getApp()
}

export function getFirestore() {
  const isRunning = firebaseIsRunning()
  if (!isRunning) getApp()

  const db = _getFirestore()

  if (!isRunning)
    if (typeof window !== undefined) enableIndexedDbPersistence(db)

  return db
}
