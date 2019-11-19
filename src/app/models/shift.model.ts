export interface Shift {
    _id?: string,
    date: string,
    employeeId: string,
    start?: string,
    end?: string,
    absent?: string,
    department?: string,
    submitted?: boolean
}