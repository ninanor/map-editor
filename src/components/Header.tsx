import { Link } from '@tanstack/react-router';

export function Header({ icon }: { icon: string }) {
  return (
    <div className="bg-primary text-primary-content">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {icon && <img src={icon} className="h-12 w-auto" />}
            <div>
              <div className="text-3xl font-bold">NINA</div>
              <div className="text-sm opacity-90">Norsk institutt for naturforskning</div>
            </div>
          </div>
          {import.meta.env.VITE_HIDE_EDIT_BUTTON !== 'true' && (
            <Link to="/editor" className="btn btn-accent">
              Map Editor
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
