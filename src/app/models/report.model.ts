interface Hour { // מודל של שעה הבנויה משעה ודקה
    hour:number,
    minute:number
}

export interface Report { //מודל של דיווח 
    start: Hour,
    end: Hour,
    comment: string 
}