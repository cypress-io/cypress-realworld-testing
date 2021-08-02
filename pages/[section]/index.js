import { useRouter } from 'next/router'
import Link from 'next/link'
import learnJson from "../../learn.json"

export default function SectionPage({ section, title, lessons }) {
  const router = useRouter()
  //const { section } = router.query

  return (
    <>
      <span>{router.query.section}</span>
      <br />
      <span>{section}</span>
      <span>{title}</span>
      <ul>
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                as={`/${section}/${lesson.slug}`}
                href={`/[section]/[slug]`}
              >
                <a>{lesson.title}</a>
              </Link>
            </li>
          ))}
        </ul>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { title, children } = learnJson[params.section]
  return {
    props: { section: params.section, lessons: children, title },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { section: 'testing-your-first-application', lessons: [], title: "Testing Your First App" } },
    ],
    fallback: true,
  }
}