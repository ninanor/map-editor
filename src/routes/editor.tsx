import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/editor')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-base-100 shadow-2xs h-screen w-sm">
      <Link className="btn btn-primary" to="/">
        Close
      </Link>
    </div>
  );
}
