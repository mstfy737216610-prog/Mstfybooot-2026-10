import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllServers() {
  const snapshot = await getDocs(collection(db, 'servers'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addServer(serverData: any) {
  const docRef = await addDoc(collection(db, 'servers'), {
    ...serverData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateServer(serverId: string, data: any) {
  await updateDoc(doc(db, 'servers', serverId), data);
}

export async function deleteServer(serverId: string) {
  await deleteDoc(doc(db, 'servers', serverId));
}

export async function getAllWebsites() {
  const snapshot = await getDocs(collection(db, 'websites'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addWebsite(websiteData: any) {
  const docRef = await addDoc(collection(db, 'websites'), {
    ...websiteData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateWebsite(websiteId: string, data: any) {
  await updateDoc(doc(db, 'websites', websiteId), data);
}

export async function getAllBalances() {
  const snapshot = await getDocs(collection(db, 'balances'));
  return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
}

export async function getUserBalance(userId: string) {
  const q = query(collection(db, 'balances'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs[0]?.data() || null;
}

export async function updateBalance(userId: string, amount: number) {
  await updateDoc(doc(db, 'balances', userId), { balance: amount, lastUpdated: new Date().toISOString() });
}

export async function getAllTransactions() {
  const snapshot = await getDocs(collection(db, 'transactions'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addTransaction(txnData: any) {
  await addDoc(collection(db, 'transactions'), {
    ...txnData,
    createdAt: new Date().toISOString(),
  });
}

export { db };
