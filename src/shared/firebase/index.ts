import { initializeApp } from 'firebase/app'
import { getFirestore, initializeFirestore } from 'firebase/firestore/lite'
import { APP_CONFIG } from 'shared/config'

const firebaseConfig = {
  ...APP_CONFIG.FIREBASE_CONFIG,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = initializeFirestore(firebaseApp, {})
export const db = getFirestore(firebaseApp)
