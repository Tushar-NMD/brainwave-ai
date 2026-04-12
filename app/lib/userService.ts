// lib/userService.ts
import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export const getUserByPhone = async (phoneNumber: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

export const createUser = async (name: string, phoneNumber: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const usersRef = collection(db, "users");
  const docRef = await addDoc(usersRef, { name, phoneNumber, password: hashedPassword });
  return { id: docRef.id, name, phoneNumber };
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};