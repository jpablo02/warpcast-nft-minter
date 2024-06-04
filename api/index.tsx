import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { pinata } from 'frog/hubs'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { abi } from '../abi.js'
import type { Address } from 'viem'
import { ethers } from 'ethers'
import { BigNumber } from "@ethersproject/bignumber";



// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: pinata(),
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => { 
  return c.res({
    action:"/second",
    image:"https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/1.jpg" ,
    intents: [
      
      
      <Button action='/second'>next</Button>,
     
    ],
  })
}),


app.frame('/second', (c) => {
  return c.res({
    action: "/third",
    image: "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/2.jpg",
    intents: [
      <Button action='/'>Back</Button>,
      <Button >Next</Button>, // Corregido aquí
    ],
  });
});

app.frame('/third', (c) => {
  return c.res({
    action: "/fourth",
    image: "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/3.jpg",
    intents: [
      <Button action='/second'>Back</Button>,
      <Button >Next</Button>, // Corregido aquí
    ],
  });
});


app.frame('/fourth', (c) => {
  
  return c.res({
    
    action:"/fifth",
    image:"https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/4.jpg" ,
    intents: [
      
      <Button action='/third'>Back</Button>,
      <Button >next</Button>,
     
    ],
  })
}),

app.frame('/fifth', (c) => {
  return c.res({
    action: '/fourth',
    image: 
      "https://gateway.lighthouse.storage/ipfs/QmUhtUX8nD1vEJ9zB9PDTjvxWhyixSQGe71duo7KexXJyy/5.jpg",
    intents: [<Button action='/fourth'>Back</Button>,,<Button.Transaction target="/mint">Take Bag</Button.Transaction>
  ],
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})

app.transaction('/mint', (c) => {
  
  const address = c.address as Address
  console.log('address',address)
  const tokenId = 0
  const uri = 'https://gateway.lighthouse.storage/ipfs/QmQFmWKZLRYc926Q7rnPQonzzw1h7YUYSENBHwpfE7fuBn'  // URI fija

  console.log('address', address)
  console.log('tokenId', tokenId)
  console.log('uri', uri)

  

  // Contract transaction response.
  return c.contract({
    
    abi,
    chainId: 'eip155:42161',//arbitrum one
   // chainId: 'eip155:42161',// base sepolia
    functionName: 'safeMint',
    args: [address, uri],
    //to: '0x1D4de18300d2869B50632A5Fc67c1Ddd1A07F4b6',
   // to: '0x6BA0ea0Fd4eCF22CE429114A5950c78Cba5d9eC1', //base sepolia
    to: '0x4329Eb272A511b97b2612312C253ec160a33B112'// arbitrum one   
  })
})


// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
