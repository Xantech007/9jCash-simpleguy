// firebase.js — 9jaCash
// Initialize Firebase and export _9jaCash global for all pages

const firebaseConfig = {
  apiKey: "AIzaSyAxN8hKsSPE7rkiDVPD2_IeT2-gxS-cdbk",
  authDomain: "jacash-simpleguy.firebaseapp.com",
  projectId: "jacash-simpleguy",
  storageBucket: "jacash-simpleguy.firebasestorage.app",
  messagingSenderId: "677801661772",
  appId: "1:677801661772:web:5d188947f08fe7c7c7abe9",
  measurementId: "G-96MW9Y7Z6W"
};


// Initialize Firebase
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');

  // Create the _9jaCash global object that ALL pages expect
  window._9jaCash = {
    app: firebase.app(),
    db: firebase.firestore(),
    auth: firebase.auth(),
    analytics: firebase.analytics ? firebase.analytics() : null
  };

  console.log('_9jaCash ready:', !!window._9jaCash.db);
} else {
  console.warn('Firebase SDK not loaded');
}

// Also keep old export for compatibility
window.firebaseApp = firebase;

// Create first admin account helper (run once in console)
async function createFirstAdmin(email, password) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    await firebase.firestore().collection('admins').doc(user.uid).set({
      email: email,
      role: 'admin',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      isActive: true
    });
    
    console.log('Admin created successfully:', user.uid);
    return user;
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

window.createFirstAdmin = createFirstAdmin;
