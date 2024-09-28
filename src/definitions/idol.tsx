import { AreaType } from "./core"

export interface Idol {
    id: string, // uuid v4
    name: string,
    dob: Date
    /// The areas this group is in
    areas: AreaType[]
}
