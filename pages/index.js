import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  return <></>
}


export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return { redirect: { permanent: false, destination: '/anchor/'}}
  } else {
    return { redirect: { permanent: false, destination: '/auth/login/'}}
  }
}