import allLanguages from "./all-supported-languages.json"

export function getAllSupportedLanguages() {
  return allLanguages.response.data.default_versions.map(
    ({
      id,
      name,
      has_text,
      has_audio,
      local_name,
      language_tag,
      total_versions,
      text_direction
    }) => ({
      id,
      name,
      has_text,
      has_audio,
      local_name,
      language_tag,
      total_versions,
      text_direction
    }))
}

// type VersionsType = {
//   id: number,
//   abbreviation: string,
//   local_abbreviation: string,
//   title: string,
//   local_title: string,
//   audio: boolean,
//   audio_count: number,
//   text: boolean,
//   language: {
//     iso_639_1: string,
//     iso_639_3: string,
//     name: string,
//     local_name: string,
//     text_direction: string,
//     language_tag: string,
//     secondary_language_tags: string | number | null
//   },
//   publisher_id: number,
//   platforms: {
//     android: boolean,
//     blackberry: boolean,
//     facebook: boolean,
//     ios: boolean,
//     win8: boolean,
//     wp7: boolean
//   },
//   metadata_build: number,
//   vrs: string
// };

// type GetBibleByVersionsByLanguageType = {
//   total_versions: number | null
//   versions: VersionsType[]
// };

export async function getBibleVersionsByLanguage(language_tag: string) {
  return await import(`./languages/${language_tag}.json`).then(data => {
    return {
      total_versions: data.default.response.data.totals.versions,
      versions: data.default.response.data.versions
    }
  }).catch(error => {
    console.log(error)
    return {
      total_versions: null,
      versions: []
    }
  })
}


// TODO - Rename conn.json to con.json
