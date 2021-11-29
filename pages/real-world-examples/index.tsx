import Head from "next/head"
import Layout from "../../components/Layout"
import RWEFeatures from "../../components/RealWorldExamples/RWEFeatures"
import RWEHero from "../../components/RealWorldExamples/RWEHero"
import Overview from "../../components/RealWorldExamples/Examples/Overview"
import Authentication from "../../components/RealWorldExamples/Examples/Authentication"
import UserSettings from "../../components/RealWorldExamples/Examples/UserSettings"
import BankAccounts from "../../components/RealWorldExamples/Examples/BankAccounts"
import NewTransactions from "../../components/RealWorldExamples/Examples/NewTransactions"
import TransactionFeeds from "../../components/RealWorldExamples/Examples/TransactionFeeds"
import Notifications from "../../components/RealWorldExamples/Examples/Notifications"
import TransactionView from "../../components/RealWorldExamples/Examples/TransactionView"
import { progressService } from "../../machines/progressService"
import coursesJson from "../../data/courses.json"
import realWorldExamples from "../../data/real-world-examples.json"

export default function Home({ content, sections, rWESections }) {
  return (
    <Layout
      content={content}
      courses={sections}
      progressService={progressService}
    >
      <Head>
        <title>Real World Examples | Real World Testing with Cypress</title>
        <meta
          name="description"
          content="Test examples from a payment application that demonstrate real-world usage of Cypress testing methods, patterns, and workflows."
        />
      </Head>

      <RWEHero />

      <RWEFeatures />

      <Overview examples={realWorldExamples["overview"]} />
      <Authentication examples={realWorldExamples["authentication"]} />
      <UserSettings examples={realWorldExamples["user-settings"]} />
      <BankAccounts examples={realWorldExamples["bank-accounts"]} />
      <NewTransactions examples={realWorldExamples["new-transactions"]} />
      <TransactionFeeds examples={realWorldExamples["transaction-feeds"]} />
      <Notifications examples={realWorldExamples["notifications"]} />
      <TransactionView examples={realWorldExamples["transaction-view"]} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const sections = Object.keys(coursesJson)
  const rWESections = Object.keys(realWorldExamples)
  return {
    props: {
      content: coursesJson,
      sections,
      realWorldExamples,
      rWESections,
    },
  }
}
