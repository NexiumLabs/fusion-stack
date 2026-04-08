export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{{PROJECT_NAME}}</h1>
      <p className="text-gray-500">
        Scaffolded with{" "}
        <a
          href="https://github.com/nexiumlabs/fusion-stack"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          fusion-stack
        </a>
      </p>
    </main>
  )
}
