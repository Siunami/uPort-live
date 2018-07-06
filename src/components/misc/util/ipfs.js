import IpfsAPI from 'ipfs-api'

// Initialize IPFS
const ipfs = IpfsAPI({
  host: 'ipfs.infura.io', 
  port: '5001', 
  protocol: 'https'
})

/**
 * Return a promise that resolves to the ipfs hash of 
 * the file or blob to upload
 * @param {File|Blob} file -- the file or blob object to upload
 */
export function uploadToIpfs(file) {
  console.log('Calling uploadToIpfs')
  return new Promise((resolve, reject) => {
    console.log('Initializing FileReader')
    const reader = new FileReader()
    reader.onload = () => {
      console.log('Reading file')
      const buf = ipfs.Buffer.from(reader.result)
      ipfs.files.add(buf, (err, data) => {
        console.log('Ipfs returns')
        console.log(data)
        if (err) {
          console.log(err)
          reject(new Error(err))
        } else {
          resolve(data[0].hash)
        }
      })
    }

    // Read the file, trigger reader.onload
    reader.readAsArrayBuffer(file)
  })
}