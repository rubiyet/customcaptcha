import Header from '@/components/Header'
import WebCam from '@/components/WebCam'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>meldcx</title>
        <meta name="description" content="Generated by Rubiyet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <WebCam />
      </div>
    </>
  )
}
