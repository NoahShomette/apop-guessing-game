import { AreaType } from "./core"

/** An Asian Pop Group
*/
export interface Group {
    /**uuid identifying this specific one*/
    id: string,
    /** Name of the group*/
    name: string,
    /** The members of the group*/
    members: string[]
    /** The prior members of the group*/
    prior_members: string[]
    /** The areas this group is in*/
    areas: AreaType[]
}
