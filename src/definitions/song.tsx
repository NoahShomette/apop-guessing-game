import { AreaType } from "./core"

/** An Asian Pop Song
*/
export interface Song {
    /** A unique id for this Song. Uuid v4 */
    id: string,
    /** The name of the song in English*/
    name: string,
    /** The album/s this song is in */
    album: string[],
    /** The singers of the song */
    singers: string[]
    /** The areas this song is from */
    areas: AreaType[]
}
