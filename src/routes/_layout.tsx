import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/Navbar';
import { Map } from '../components/Map';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <Outlet />
      <div className="flex flex-col flex-auto">
        <Navbar />
        <div className="relative w-full h-full">
          <Map />
        </div>
      </div>
    </div>
  );
}
