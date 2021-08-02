import { useRouter } from 'next/router'

export default function SectionPage({ section }) {
  const router = useRouter()
  //const { section } = router.query

  return (
    <>
      <span>{router.query.section}</span>
      <br />
      <span>{section}</span>
    </>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: { section: params.section },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { section: 'testing-your-first-application' } },
    ],
    fallback: true,
  }
}