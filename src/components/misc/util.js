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
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const buf = ipfs.Buffer.from(reader.result)
      ipfs.files.add(buf, (err, data) => {
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