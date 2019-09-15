interface Hour {
    hour:number,
    minute:number
}

export interface Report {
    start: Hour,
    end: Hour,
    comment: string 
}