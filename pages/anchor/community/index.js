

export default function CommunityHomePage() {
  return <></> 
}

export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return { redirect: { permanent: false, destination: '/anchor/community/discussion/' }}
  } else {
    return { redierct: { permanent: false, destination: '/auth/login/' } }
  }

}

