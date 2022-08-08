import { useState } from 'react'
import Welcome from './components/welcome'
import { invoke } from '@tauri-apps/api/tauri'
import VersionTile from './components/version_tile'
// import { versions } from './__mocks__/versions'
import { useEffect } from 'react'
const current = '15'
const versions = [
  '15',
  '14',
  '13',
  '12',
  '11',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
]



function App() {
  const [currentVersion, setCurrentVersion] = useState("")
  const [all_versions, setVersions] = useState("")
  async function change_version() {
    let result = await invoke('change_version') as string
    setCurrentVersion(result)
  }
  async function getCurrentVersion() {
    let current = await invoke('get_node_version') as string
    setCurrentVersion(current)

  }

  useEffect(
    ()=>{
      const fetch_versions =async () => {
        const result = await invoke('get_all_versions') as string
        return result
      }
      fetch_versions().then(result => {
        setVersions(result)
      })
    },
    []
  )

  return (
    <div>
      <Welcome/>
      <div className=' overflow-y-scroll pt-3 space-y-3 h-40 border-2'>
        {
          versions.map(
            v=>{
              return <VersionTile version={v} is_current={v == currentVersion} />
            }
          )
        }
      </div>
    </div>
  )
}

export default App
