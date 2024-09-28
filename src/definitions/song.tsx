import { AreaType } from "./core"

export interface Song {
    id: string, // uuid v4
    name: string,
    singers: string[]
    /// The areas this group is in
    areas: AreaType[]
}
