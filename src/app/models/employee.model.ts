export interface Employee { //מודל של עובד
    _id?: string; //תעודת זהות
    username: string; //שם משתמש
    email: string; //אימייל
    password?: string; //סיסמא
    firstName: string; //שם פרטי
    lastName: string; // שם משפחה
    id: string; //תעודת זהות
    phoneNumber: string; //מספר טלפון
    department: string; // מחלקה
    role: string; //תפקיד
}