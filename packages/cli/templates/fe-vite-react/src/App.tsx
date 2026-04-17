export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{{PROJECT_NAME}}</h1>
      <p className="text-gray-400">
        Scaffolded with{" "}
        <a
          href="https://github.com/nexiumlabs/fusion-stack"
          className="underline hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          fusion-stack
        </a>
      </p>
    </main>
  )
}
