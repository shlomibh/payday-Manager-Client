export interface Shift { // מודל של משמרת
    _id?: string; //תעודת זהות של המשתמש שדיווח
    date: string; //תאריך דיווח
    employeeId: string; //תעודת זהות של העובד
    start?: string; //שעת התחלה
    end?: string; //שעת סוף
    absent?: string; //חיסור
    department?: string;//מחלקה
    submitted?: boolean; //דיווחים שאושרו ע״י ראש המחלקה
    lectorSubmitted?: boolean; //דיווחים שאושרו ע״י המרצה
    dateLectorSubmit?: string; //התאריך בו אישר המרצה את הדיווח
}
