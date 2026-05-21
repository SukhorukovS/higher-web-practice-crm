import { Button } from 'antd';

export function StubPage() {
  return (
    <main className="welcome-layout">
      <h1 className="text-3xl mt-8">Study template</h1>
      <Button type="primary">Primary Button</Button>
      <p>
        This branch contains a minimal Vite + React + TypeScript starter with a single route and a
        json-server backend.
      </p>
      <p>Replace this page with your domain pages as you build the project.</p>
    </main>
  )
}

