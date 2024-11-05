import { AreaType } from "./core"

/** An Asian Pop Idol
*/
export interface Idol {
    /** A unique id for this Idol. Uuid v4 */
    id: string,
    /** The name of the Idol in english */
    name: string,
    /** The idols date of birth */
    dob: Date
    /// The areas this idol is active in
    areas: AreaType[]
}
